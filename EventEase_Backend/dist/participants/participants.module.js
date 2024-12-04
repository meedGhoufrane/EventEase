"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantModule = exports.ParticipantsModule = void 0;
const common_1 = require("@nestjs/common");
const participants_controller_1 = require("./participants.controller");
const participants_service_1 = require("./participants.service");
const mongoose_1 = require("@nestjs/mongoose");
const participant_entity_1 = require("./entities/participant.entity");
const event_entity_1 = require("../event/entities/event.entity");
<<<<<<< HEAD
let ParticipantsModule = class ParticipantsModule {
=======
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let ParticipantModule = class ParticipantModule {
>>>>>>> 081bf846ce52072fec771162084d2fc37bb7abb0
};
exports.ParticipantsModule = ParticipantsModule;
exports.ParticipantsModule = ParticipantsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: participant_entity_1.Participant.name, schema: participant_entity_1.ParticipantSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: event_entity_1.Event.name, schema: event_entity_1.EventSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Participant', schema: participant_entity_1.ParticipantSchema }]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '1h' },
                }),
            }),
        ],
        controllers: [participants_controller_1.ParticipantController],
        providers: [participants_service_1.ParticipantService],
        exports: [jwt_1.JwtModule]
    })
], ParticipantsModule);
class ParticipantModule {
}
exports.ParticipantModule = ParticipantModule;
//# sourceMappingURL=participants.module.js.map