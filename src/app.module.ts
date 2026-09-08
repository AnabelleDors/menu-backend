import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({

      inject: [ConfigService],

      useFactory: (configService: ConfigService) => {
        const databaseURL = configService.get<string>('SUPABASE_URL');
        const databaseSCHEMA = configService.get<string>('SUPABASE_SCHEMA');

        if (!databaseURL) {
          throw new Error(
            'A variável de ambiente SUPABASE_URL não foi encontrada!',
          );
        }

        if (!databaseSCHEMA) {
          throw new Error(
            'A variável de ambiente SUPABASE_SCHEMA não foi encontrada!',
          );
        }

        return {
          type: 'postgres',
          url: databaseURL,
          schema: databaseSCHEMA,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}