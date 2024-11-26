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
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const event_entity_1 = require("./entities/event.entity");
const participant_entity_1 = require("../participants/entities/participant.entity");
let EventService = class EventService {
    constructor(eventModel, participantModel) {
        this.eventModel = eventModel;
        this.participantModel = participantModel;
    }
    isValidObjectId(id) {
        return mongoose_2.Types.ObjectId.isValid(id);
    }
    async addParticipants(eventId, participants) {
        const event = await this.eventModel.findById(eventId);
        if (!event) {
            throw new common_1.NotFoundException(`Event with ID "${eventId}" not found`);
        }
        const participantIds = participants.map(id => new mongoose_2.Types.ObjectId(id));
        event.participants.push(...participantIds);
        await event.save();
        return event;
    }
    async create(createEventDto) {
        const event = new this.eventModel(createEventDto);
        await event.save();
        if (createEventDto.participants && createEventDto.participants.length > 0) {
            const validParticipantIds = createEventDto.participants.filter(this.isValidObjectId);
            if (validParticipantIds.length === 0) {
                throw new common_1.NotFoundException('No valid participant IDs provided');
            }
            const participants = await this.participantModel
                .find({ '_id': { $in: validParticipantIds } })
                .exec();
            if (participants.length !== validParticipantIds.length) {
                throw new common_1.NotFoundException('One or more participants not found');
            }
            event.participants.push(...participants.map((participant) => participant._id));
            await event.save();
        }
        return {
            event,
            message: 'Event created successfully',
        };
    }
    async findAll() {
        return this.eventModel.find().populate('participants').exec();
    }
    async findOne(id) {
        const event = await this.eventModel.findById(id).populate('participants').exec();
        if (!event) {
            throw new common_1.NotFoundException(`Event with ID "${id}" not found`);
        }
        return event;
    }
    async update(id, updateEventDto) {
        const updatedEvent = await this.eventModel
            .findByIdAndUpdate(id, {
            ...updateEventDto,
            participants: updateEventDto.participants ? updateEventDto.participants.map(participantId => new mongoose_2.Types.ObjectId(participantId)) : [],
        }, { new: true })
            .exec();
        if (!updatedEvent) {
            throw new common_1.NotFoundException(`Event with ID "${id}" not found`);
        }
        return {
            event: updatedEvent,
            message: 'Event updated successfully',
        };
    }
    async remove(id) {
        const result = await this.eventModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Event with ID "${id}" not found`);
        }
        return {
            message: 'Event deleted successfully',
        };
    }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(event_entity_1.Event.name)),
    __param(1, (0, mongoose_1.InjectModel)(participant_entity_1.Participant.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], EventService);
//# sourceMappingURL=event.service.js.map