import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

@Module({
  imports: [UserModule],
  providers: [
    {
      provide: 'USER_SERVICE',
      useFactory: () => ({
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      }),
    },
  ],
})
export class AppModule {}
