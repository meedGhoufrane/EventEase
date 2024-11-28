"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfig = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
exports.DatabaseConfig = mongoose_1.MongooseModule.forRootAsync({
    imports: [config_1.ConfigModule],
    useFactory: (configService) => ({
        uri: configService.get('MONGO_URI'),
    }),
    inject: [config_1.ConfigService],
});
//# sourceMappingURL=database.config.js.map