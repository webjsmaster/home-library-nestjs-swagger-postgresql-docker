import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './typeorm.config'
import { LoggerMiddleware } from './middleware/logger.middleware'
import { APP_FILTER, APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { AllExceptionsFilter } from './exceptionsFilter/http-all-exception.filter'
import { LoggerModule } from './logging/logger.module'
import {
  AlbumsModule,
  ArtistsModule,
  AuthModule,
  TracksModule,
  UsersModule,
} from './api'
import { FavoritesModule } from './api/favorites/favorites.module'
import { FavoritesController } from './api/favorites/favorites.controller'

@Module({
  imports: [
    UsersModule,
    TracksModule,
    ArtistsModule,
    AlbumsModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    FavoritesModule,
  ],
  controllers: [FavoritesController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    // FilesService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).exclude('api').forRoutes('*')
  }
}
