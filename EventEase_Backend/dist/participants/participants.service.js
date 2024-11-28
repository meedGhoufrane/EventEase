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
const event_entity_1 = require("../event/entities/event.entity");
let ParticipantService = class ParticipantService {
    constructor(participantModel, eventModel) {
        this.participantModel = participantModel;
        this.eventModel = eventModel;
    }
    async create(createParticipantDto) {
        const { email, cin } = createParticipantDto;
        const existingParticipant = await this.participantModel.findOne({
            $or: [{ email }, { cin }],
        });
        if (existingParticipant) {
            if (existingParticipant.email === email && existingParticipant.cin === cin) {
                throw new common_1.ConflictException('Email and CIN already exist');
            }
            else if (existingParticipant.email === email) {
                throw new common_1.ConflictException('Email already exists');
            }
            else if (existingParticipant.cin === cin) {
                throw new common_1.ConflictException('CIN already exists');
            }
        }
        try {
            const participant = new this.participantModel(createParticipantDto);
            const savedParticipant = await participant.save();
            const event = await this.eventModel.findById(createParticipantDto.event);
            if (!event) {
                throw new common_1.NotFoundException(`Event with ID "${createParticipantDto.event}" not found`);
            }
            event.participants.push(savedParticipant._id);
            await event.save();
            return savedParticipant;
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.ConflictException('Duplicate key error');
            }
            throw error;
        }
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
        const { event: newEventId } = updateParticipantDto;
        const existingParticipant = await this.participantModel.findById(id).exec();
        if (!existingParticipant) {
            throw new common_1.NotFoundException(`Participant with ID "${id}" not found`);
        }
        const oldEventId = existingParticipant.event;
        if (newEventId && oldEventId && newEventId !== oldEventId.toString()) {
            const oldEvent = await this.eventModel.findById(oldEventId).exec();
            if (oldEvent) {
                oldEvent.participants = oldEvent.participants.filter((participantId) => participantId.toString() !== id);
                await oldEvent.save();
            }
            const newEvent = await this.eventModel.findById(newEventId).exec();
            if (!newEvent) {
                throw new common_1.NotFoundException(`Event with ID "${newEventId}" not found`);
            }
            newEvent.participants.push(existingParticipant._id);
            await newEvent.save();
        }
        const updatedParticipant = await this.participantModel
            .findByIdAndUpdate(id, updateParticipantDto, { new: true })
            .populate('event')
            .exec();
        return updatedParticipant;
    }
    async remove(id) {
        const participant = await this.participantModel.findById(id).exec();
        if (!participant) {
            throw new common_1.NotFoundException(`Participant with ID "${id}" not found`);
        }
        if (participant.event) {
            const event = await this.eventModel.findById(participant.event);
            if (event) {
                event.participants = event.participants.filter((participantId) => participantId.toString() !== id);
                await event.save();
            }
        }
        await this.participantModel.findByIdAndDelete(id).exec();
        return participant;
    }
};
exports.ParticipantService = ParticipantService;
exports.ParticipantService = ParticipantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(participant_entity_1.Participant.name)),
    __param(1, (0, mongoose_1.InjectModel)(event_entity_1.Event.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ParticipantService);
//# sourceMappingURL=participants.service.js.map