// app/services/profileService.js

const User = require("../models/user.schema");
const { client } = require("../config/redis");

const userProfile = {};

// Create Profile
userProfile.createProfile = async (data) => {
    const user = await User.create(data);
    return user;
};

// Get Profile By ID with Redis Cache
userProfile.getProfileById = async (id) => {
    const cacheKey = `profile:${id}`;

    // 1. Check Redis
    const cachedProfile = await client.get(cacheKey);

    if (cachedProfile) {
        console.log("Cache HIT 😈🔥");

        return {
            source: "redis",
            data: JSON.parse(cachedProfile)
        };
    }

    console.log("Cache MISS 😭");

    // 2. Fetch from MongoDB
    const profile = await User.findById(id);

    if (!profile) {
        throw new Error("Profile not found");
    }

    // 3. Store in Redis (TTL = 60 sec)
    await client.set(
        cacheKey,
        JSON.stringify(profile),
        {
            EX: 60
        }
    );

    return {
        source: "mongodb",
        data: profile
    };
};

userProfile.updateProfile = async (id, data) => {
    const updatedProfile = await User.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );

    if (!updatedProfile) {
        throw new Error("Profile not found");
    }

    // Delete stale cache
    await client.del(`profile:${id}`);

    return updatedProfile;
};

// app/services/profileService.js

userProfile.deleteProfile = async (id) => {
    const deletedProfile = await User.findByIdAndDelete(id);

    if (!deletedProfile) {
        throw new Error("Profile not found");
    }

    // Remove cache
    await client.del(`profile:${id}`);

    return deletedProfile;
};

module.exports = userProfile;