import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module'; // Adjust path if necessary
import { Transport, ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    UserModule, // Import UserModule here
    ClientsModule.register([
      {
        name: 'USER_SERVICE', // Service identifier
        transport: Transport.TCP, // Set transport to TCP
        options: {
          host: 'localhost', // Set to the desired localhost (could be different in real setup)
          port: 3001, // Set to the desired port for User Service
        },
      },
    ]),
  ],
  providers: [],
})
export class AppModule {}
