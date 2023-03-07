import { Injectable, NotFoundException } from '@nestjs/common'
import { TrackDto } from './dto/track.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { TrackEntity } from './entity/tracks.entity'
import { Repository } from 'typeorm'
import { ArtistsService } from '../artists/artists.service'
import { AlbumsService } from '../albums/albums.service'

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
    // @Inject(forwardRef(() => ArtistsService))
    // private artistsService: ArtistsService, // private fileService: FilesService,
    private artistsService: ArtistsService,
    private albumsService: AlbumsService,
  ) {}

  async getAll() {
    return await this.trackRepository.find()
  }

  async getOne(id) {
    const track = await this.trackRepository.findOne({ where: { id } })
    if (track) {
      return track
    } else {
      throw new NotFoundException('Track not found')
    }
  }

  checkExists = async (
    id: string,
    type: 'albumsService' | 'artistsService',
  ) => {
    const res = await this[type].getOneForFav(id)
    if (!res) {
      // return null
      throw new NotFoundException('This Artist or Album no found')
    } else {
      return id
    }
  }

  async getOneForFav(id) {
    return await this.trackRepository.findOne({ where: { id } })
  }

  async getManyAndDelete(id: string, type: 'artist' | 'album') {
    const tracks = await this.trackRepository.find({
      where: { [type + 'Id']: id },
    })
    tracks.map((track) => {
      this.trackRepository.update(track.id, { ...track, [type + 'Id']: null })
    })
    return { id, type }
  }

  async create(trackData: TrackDto): Promise<TrackEntity> {
    if (trackData.albumId) {
      trackData.albumId = await this.checkExists(
        trackData.albumId,
        'albumsService',
      )
    }
    if (trackData.artistId) {
      trackData.artistId = await this.checkExists(
        trackData.artistId,
        'artistsService',
      )
    }
    const track = await this.trackRepository.save(trackData)
    return await this.getOne(track.id)
  }

  async update(id: string, trackData: TrackDto) {
    const track = await this.trackRepository.findOne({
      where: { id },
    })

    if (!track) {
      throw new NotFoundException('Track not found')
    } else {
      await this.trackRepository.update(id, trackData)
      return await this.getOne(track.id)
    }
  }

  async delete(id: string) {
    const track = await this.getOne(id)
    if (track) {
      return await this.trackRepository.delete({ id: track.id })
    } else {
      throw new NotFoundException('Track not found')
    }
  }
}
