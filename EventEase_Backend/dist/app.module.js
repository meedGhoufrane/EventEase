"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const event_module_1 = require("./event/event.module");
const participants_module_1 = require("./participants/participants.module");
const config_1 = require("@nestjs/config");
const database_config_1 = require("./config/database.config");
const users_module_1 = require("./users/users.module");
const jwt_1 = require("@nestjs/jwt");
const auth_guard_1 = require("./common/auth/auth.guard");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            event_module_1.EventModule,
            participants_module_1.ParticipantModule,
            users_module_1.UsersModule,
            config_1.ConfigModule.forRoot(),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '1h' },
                }),
                inject: [config_1.ConfigService],
            }),
            database_config_1.DatabaseConfig
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, auth_guard_1.JwtAuthGuard],
        exports: [auth_guard_1.JwtAuthGuard],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map