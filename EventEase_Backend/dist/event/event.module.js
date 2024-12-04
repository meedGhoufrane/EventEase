"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const event_entity_1 = require("./entities/event.entity");
const participant_entity_1 = require("../participants/entities/participant.entity");
const event_service_1 = require("./event.service");
const event_controller_1 = require("./event.controller");
const participants_module_1 = require("../participants/participants.module");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let EventModule = class EventModule {
};
exports.EventModule = EventModule;
exports.EventModule = EventModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: event_entity_1.Event.name, schema: event_entity_1.EventSchema },
                { name: participant_entity_1.Participant.name, schema: participant_entity_1.ParticipantSchema },
            ]),
            participants_module_1.ParticipantModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '1h' },
                }),
            }),
        ],
        controllers: [event_controller_1.EventController],
        providers: [event_service_1.EventService],
        exports: [mongoose_1.MongooseModule.forFeature([{ name: event_entity_1.Event.name, schema: event_entity_1.EventSchema }])]
    })
], EventModule);
//# sourceMappingURL=event.module.js.map