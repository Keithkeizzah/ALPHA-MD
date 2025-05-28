const config = require("../set");
const { DataTypes } = require('sequelize');

const AutoBioDB = config.DATABASE.define('autobio', {
    status: {
        type: DataTypes.ENUM('on', 'off'),
        defaultValue: 'on',
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        defaultValue: '🌟 Always active!',
        allowNull: false
    },
    timezone: {
        type: DataTypes.STRING,
        defaultValue: 'Africa/Nairobi',
        allowNull: false
    }
}, {
    timestamps: false
});

async function initAutoBioDB() {
    try {
        await AutoBioDB.sync({ alter: true });
        console.log('AutoBio table ready');
    } catch (error) {
        console.error('Error initializing AutoBio table:', error);
        throw error;
    }
}

async function getAutoBioSettings() {
    try {
        const [settings] = await AutoBioDB.findOrCreate({
            where: {},
            defaults: {}
        });
        return settings;
    } catch (error) {
        console.error('Error getting AutoBio settings:', error);
        return { status: 'on', message: '🌟 Always active!', timezone: 'Africa/Nairobi' };
    }
}

async function updateAutoBioSettings(updates) {
    try {
        const settings = await getAutoBioSettings();
        return await settings.update(updates);
    } catch (error) {
        console.error('Error updating AutoBio settings:', error);
        return null;
    }
}

module.exports = {
    initAutoBioDB,
    getAutoBioSettings,
    updateAutoBioSettings,
    AutoBioDB
};
