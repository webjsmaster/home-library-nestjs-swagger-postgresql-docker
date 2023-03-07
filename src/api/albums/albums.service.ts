import { Injectable, NotFoundException } from '@nestjs/common'
// import { FavoritesService } from '../favorites/favorites.service'
// import { TracksService } from '../tracks/tracks.service'
import { InjectRepository } from '@nestjs/typeorm'
import { AlbumEntity } from './entity/albums.entity'
import { Repository } from 'typeorm'
import { CreateAlbumDto } from './dto/create-albums.dto'
import { UpdateAlbumsDto } from './dto/update-albums.dto'
import { ArtistsService } from '../artists/artists.service'

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    private artistsService: ArtistsService, // private favoriteService: FavoritesService, // @Inject(forwardRef(() => FavoritesService)) // @Inject(forwardRef(() => TracksService)) // private tracksService: TracksService,
  ) {}

  async getAll() {
    return await this.albumRepository.find()
  }

  async getOne(id) {
    const album = await this.albumRepository.findOne({ where: { id } })
    if (album) {
      return album
    } else {
      throw new NotFoundException('Album not found')
    }
  }

  async getOneForFav(id) {
    console.log('☄️:')

    return await this.albumRepository.findOne({ where: { id } })
  }

  async create(albumData: CreateAlbumDto): Promise<AlbumEntity> {
    if (albumData.artistId) {
      albumData.artistId = await this.checkArtistExists(albumData.artistId)
    }
    const album = this.albumRepository.create(albumData)
    return await this.albumRepository.save(album)
  }

  async update(id: string, data: UpdateAlbumsDto) {
    const album = await this.albumRepository.findOne({
      where: { id },
    })

    if (!album) {
      throw new NotFoundException('Album not found')
    } else {
      await this.albumRepository.update(id, data)
      return await this.getOne(album.id)
    }
  }

  async delete(id: string, path) {
    const album = await this.getOne(id)
    if (album) {
      // await this.tracksService.getManyAndDelete(id, path)
      return await this.albumRepository.delete({ id: album.id })
    } else {
      throw new NotFoundException('Album not found')
    }
  }

  checkArtistExists = async (artistId: string) => {
    const artist = await this.artistsService.getOne(artistId)
    if (!artist) {
      return null
    } else {
      return artistId
    }
  }
}
