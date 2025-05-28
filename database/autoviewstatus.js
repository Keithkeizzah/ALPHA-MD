const config = require("../set");
const { DataTypes } = require('sequelize');

const AutoViewStatusDB = config.DATABASE.define('autoviewstatus', {
    status: {
        type: DataTypes.ENUM('on', 'off'),
        defaultValue: 'on',
        allowNull: false
    }
}, {
    timestamps: false
});

async function initAutoViewStatusDB() {
    try {
        await AutoViewStatusDB.sync({ alter: true });
        console.log('AutoViewStatus table ready');
    } catch (error) {
        console.error('Error initializing AutoViewStatus table:', error);
        throw error;
    }
}

async function getAutoViewStatusSettings() {
    try {
        const [settings] = await AutoViewStatusDB.findOrCreate({
            where: {},
            defaults: {}
        });
        return settings;
    } catch (error) {
        console.error('Error getting AutoViewStatus settings:', error);
        return { status: 'on' };
    }
}

async function updateAutoViewStatusSettings(updates) {
    try {
        const settings = await getAutoViewStatusSettings();
        return await settings.update(updates);
    } catch (error) {
        console.error('Error updating AutoViewStatus settings:', error);
        return null;
    }
}

module.exports = {
    initAutoViewStatusDB,
    getAutoViewStatusSettings,
    updateAutoViewStatusSettings,
    AutoViewStatusDB
};
