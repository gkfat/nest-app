import {
    RedisModule,
    RedisModuleOptions,
} from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import {
    ConfigModule,
    ConfigService,
} from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { MiddlewaresModule } from './middlewares/middlewares.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { AuthModule } from './modules/auth/auth.module';
import { PortfoliosModule } from './modules/portfolios/portfolios.module';
import { RolesModule } from './modules/roles/roles.module';

const envFilePath = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'; 

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [envFilePath],
        }),
        RedisModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService): Promise<RedisModuleOptions> => {
                return {
                    readyLog: true,
                    config: {
                        host: configService.getOrThrow('REDIS_HOST'),
                        port: +configService.getOrThrow('REDIS_PORT'),
                        username: configService.get('REDIS_USERNAME'),
                        password: configService.get('REDIS_PASSWORD'),
                    },
                };
            },
        }),
        MiddlewaresModule,
        DatabaseModule,
        AuthModule,
        AccountsModule,
        RolesModule,
        PortfoliosModule,
    ],
})
export class AppModule {}
