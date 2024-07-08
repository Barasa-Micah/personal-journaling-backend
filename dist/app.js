"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const journalRoutes_1 = __importDefault(require("./routes/journalRoutes"));
const models_1 = require("./models");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('/api/auth', authRoutes_1.default);
app.use('/api/journals', journalRoutes_1.default);
const PORT = process.env.PORT || 5000;
(0, models_1.dbInit)()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error('Unable to initialize the database:', error);
});
