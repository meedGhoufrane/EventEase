"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const participant_entity_1 = require("./entities/participant.entity");
let ParticipantService = class ParticipantService {
    constructor(participantModel) {
        this.participantModel = participantModel;
    }
    async create(createParticipantDto) {
        const participant = new this.participantModel(createParticipantDto);
        return participant.save();
    }
    async findAll() {
        return this.participantModel.find().populate('event').exec();
    }
    async findOne(id) {
        const participant = await this.participantModel.findById(id).populate('event').exec();
        if (!participant) {
            throw new common_1.NotFoundException(`Participant with ID "${id}" not found`);
        }
        return participant;
    }
    async update(id, updateParticipantDto) {
        const updatedParticipant = await this.participantModel
            .findByIdAndUpdate(id, updateParticipantDto, { new: true })
            .populate('event')
            .exec();
        if (!updatedParticipant) {
            throw new common_1.NotFoundException(`Participant with ID "${id}" not found`);
        }
        return updatedParticipant;
    }
};
exports.ParticipantService = ParticipantService;
exports.ParticipantService = ParticipantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(participant_entity_1.Participant.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ParticipantService);
//# sourceMappingURL=participants.service.js.map