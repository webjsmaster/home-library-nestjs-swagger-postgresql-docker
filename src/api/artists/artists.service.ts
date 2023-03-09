import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ArtistDto } from "./dto/artist.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ArtistEntity } from "./entity/artists.entity";
import { DeleteResult, Repository } from "typeorm";
import { FilesService, TracksService } from "..";

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
    @Inject(forwardRef(() => FilesService))
    private fileService: FilesService
  ) {
  }

  async getAll(): Promise<ArtistEntity[]> {
    return await this.artistRepository.find();
  }

  async getOne(id): Promise<ArtistEntity> {
    const user = await this.artistRepository.findOne({ where: { id } });
    if (user) {
      return user;
    } else {
      throw new NotFoundException();
    }
  }

  async getOneForFav(id): Promise<ArtistEntity> {
    return await this.artistRepository.findOne({ where: { id } });
  }

  async create(data: ArtistDto, poster: Express.Multer.File): Promise<ArtistEntity> {
    const fileName = poster ? await this.fileService.createFile(poster) : null;
    const artist = await this.artistRepository.save({
      ...data,
      poster: fileName
    });
    return await this.getOne(artist.id);
  }

  async update(id: string, data: ArtistDto): Promise<ArtistEntity> {
    const artist = await this.getOne(id);

    if (!artist) {
      throw new NotFoundException("Artist not found");
    } else {
      await this.artistRepository.update(id, data);
      return await this.getOne(id);
    }
  }

  async delete(id: string, path): Promise<DeleteResult> {
    const artist = await this.getOne(id);

    if (artist) {
      // await this.tracksService.getManyAndDelete(id, path)
      return await this.artistRepository.delete({ id: artist.id });
    } else {
      throw new NotFoundException("Artist not found");
    }
  }
}
