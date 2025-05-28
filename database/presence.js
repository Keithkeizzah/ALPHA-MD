const config = require("../set");
const { DataTypes } = require('sequelize');

const PresenceDB = config.DATABASE.define('presence', {
    status: {
        type: DataTypes.STRING,
        defaultValue: 'available', // 'available', 'composing', 'recording'
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
}, {
    timestamps: false
});

async function initPresenceDB() {
    try {
        await PresenceDB.sync({ alter: true });
        console.log('Presence table ready');
    } catch (error) {
        console.error('Error initializing presence table:', error);
        throw error;
    }
}

async function getPresenceSettings() {
    try {
        const [settings] = await PresenceDB.findOrCreate({
            where: {},
            defaults: {}
        });
        return settings;
    } catch (error) {
        console.error('Error getting presence settings:', error);
        return { status: 'available', isActive: true };
    }
}

async function updatePresenceSettings(updates) {
    try {
        const settings = await getPresenceSettings();
        return await settings.update(updates);
    } catch (error) {
        console.error('Error updating presence settings:', error);
        return null;
    }
}

module.exports = {
    initPresenceDB,
    getPresenceSettings,
    updatePresenceSettings,
    PresenceDB
};
