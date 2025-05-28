const config = require("../set");
const { DataTypes } = require('sequelize');

const AntiBotDB = config.DATABASE.define('antibot', {
    jid: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('on', 'off'),
        defaultValue: 'off',
        allowNull: false
    },
    action: {
        type: DataTypes.ENUM('delete', 'warn', 'remove'),
        defaultValue: 'remove',
        allowNull: false
    }
}, {
    timestamps: false
});

// Initialize table
async function initAntiBotDB() {
    try {
        await AntiBotDB.sync({ alter: true });
        console.log('AntiBot table ready');
    } catch (error) {
        console.error('Error initializing AntiBot table:', error);
        throw error;
    }
}

// Get settings for a group
async function getAntiBotSettings(jid) {
    try {
        const [settings] = await AntiBotDB.findOrCreate({
            where: { jid },
            defaults: {}
        });
        return settings;
    } catch (error) {
        console.error('Error getting AntiBot settings:', error);
        return { status: 'off', action: 'remove' }; // Default fallback
    }
}

// Update settings
async function updateAntiBotSettings(jid, updates) {
    try {
        const settings = await getAntiBotSettings(jid);
        return await settings.update(updates);
    } catch (error) {
        console.error('Error updating AntiBot settings:', error);
        return false;
    }
}

module.exports = {
    initAntiBotDB,
    getAntiBotSettings,
    updateAntiBotSettings,
    AntiBotDB
};
