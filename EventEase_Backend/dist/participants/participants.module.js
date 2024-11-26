"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantModule = void 0;
const common_1 = require("@nestjs/common");
const participants_service_1 = require("./participants.service");
const participants_controller_1 = require("./participants.controller");
const mongoose_1 = require("@nestjs/mongoose");
const participant_entity_1 = require("./entities/participant.entity");
let ParticipantModule = class ParticipantModule {
};
exports.ParticipantModule = ParticipantModule;
exports.ParticipantModule = ParticipantModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: participant_entity_1.Participant.name, schema: participant_entity_1.ParticipantSchema }])],
        controllers: [participants_controller_1.ParticipantController],
        providers: [participants_service_1.ParticipantService],
        exports: [participants_service_1.ParticipantService],
    })
], ParticipantModule);
//# sourceMappingURL=participants.module.js.map