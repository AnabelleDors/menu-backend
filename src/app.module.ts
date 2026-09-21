import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpotModule } from './cases/spots/spot.module';
import { ProductModule } from './cases/products/product.module';
import { CategoryModule } from './cases/categories/category.module';
import { OrdersModule } from './cases/orders/orders.module';
import { GuestCheckModule } from './cases/guest-check/guest-check.module';

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
          synchronize: true,
          ssl: false,
        };
      },
    }),
    CategoryModule,
    ProductModule,
    SpotModule,
    GuestCheckModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}