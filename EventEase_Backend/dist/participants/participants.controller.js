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
exports.ParticipantController = void 0;
const common_1 = require("@nestjs/common");
const participants_service_1 = require("./participants.service");
const create_participant_dto_1 = require("./dto/create-participant.dto");
const update_participant_dto_1 = require("./dto/update-participant.dto");
const auth_guard_1 = require("../common/auth/auth.guard");
let ParticipantController = class ParticipantController {
    constructor(participantService) {
        this.participantService = participantService;
    }
    async create(createParticipantDto) {
        try {
            return await this.participantService.create(createParticipantDto);
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            throw error;
        }
    }
    async findAll() {
        return this.participantService.findAll();
    }
    async findOne(id) {
        return this.participantService.findOne(id);
    }
    async update(id, updateParticipantDto) {
        try {
            return await this.participantService.update(id, updateParticipantDto);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(`Participant with ID "${id}" not found`);
            }
            throw error;
        }
    }
};
exports.ParticipantController = ParticipantController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_participant_dto_1.CreateParticipantDto]),
    __metadata("design:returntype", Promise)
], ParticipantController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ParticipantController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParticipantController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_participant_dto_1.UpdateParticipantDto]),
    __metadata("design:returntype", Promise)
], ParticipantController.prototype, "update", null);
exports.ParticipantController = ParticipantController = __decorate([
    (0, common_1.Controller)('participants'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [participants_service_1.ParticipantService])
], ParticipantController);
//# sourceMappingURL=participants.controller.js.map