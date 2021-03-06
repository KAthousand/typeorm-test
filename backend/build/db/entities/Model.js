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
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
// create an abstract class that extends from BaseEntity from typeORM
class Model extends typeorm_1.BaseEntity {
    constructor(model) {
        super();
        Object.assign(this, model);
    }
    // BeforeInsert: TypeORM will call it before the entity is inserted using repository/manager save.
    // Generate a uuid from the library
    createUuid() {
        this.uuid = uuid_1.v4();
    }
}
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Model.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'uuid' }),
    __metadata("design:type", String)
], Model.prototype, "uuid", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date
    // UpdatedAt
    )
], Model.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Model.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.DeleteDateColumn(),
    __metadata("design:type", Date
    // BeforeInsert: TypeORM will call it before the entity is inserted using repository/manager save.
    )
], Model.prototype, "deletedDateTime", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Model.prototype, "createUuid", null);
exports.default = Model;
