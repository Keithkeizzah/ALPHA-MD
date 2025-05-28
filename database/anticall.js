const config = require("../set");
const { DataTypes } = require('sequelize');

const AntiCallDB = config.DATABASE.define('anticall', {
    status: {
        type: DataTypes.ENUM('yes', 'no'),
        defaultValue: 'no',
        allowNull: false
    },
    action: {
        type: DataTypes.ENUM('block', 'decline'),
        defaultValue: 'decline',
        allowNull: false
    }
}, {
    timestamps: false
});

async function initAntiCallDB() {
    try {
        await AntiCallDB.sync({ alter: true });
        console.log('AntiCall table ready');
    } catch (error) {
        console.error('Error initializing AntiCall table:', error);
        throw error;
    }
}

async function getAntiCallSettings() {
    try {
        const [settings] = await AntiCallDB.findOrCreate({
            where: {},
            defaults: {}
        });
        return settings;
    } catch (error) {
        console.error('Error getting anti-call settings:', error);
        return { status: 'no', action: 'decline' };
    }
}

async function updateAntiCallSettings(updates) {
    try {
        const settings = await getAntiCallSettings();
        return await settings.update(updates);
    } catch (error) {
        console.error('Error updating anti-call settings:', error);
        return null;
    }
}

module.exports = {
    initAntiCallDB,
    getAntiCallSettings,
    updateAntiCallSettings,
    AntiCallDB
};
