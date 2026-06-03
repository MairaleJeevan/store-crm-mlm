const supabase = require('../config/supabase');
const generateReferralCode = require('../utils/referralCode');

// Register MLM User
const registerMLMUser = async (req, res) => {

    try {

        const {
            full_name,
            email,
            password,
            sponsor_referral_code
        } = req.body;

        let sponsorId = null;
        let level = 1;

        if (sponsor_referral_code) {

            const {
                data: sponsor,
                error: sponsorError
            } = await supabase
                .from('users')
                .select('*')
                .eq(
                    'referral_code',
                    sponsor_referral_code
                )
                .single();

            if (sponsorError || !sponsor) {

                return res.status(400).json({
                    success: false,
                    message:
                        'Invalid sponsor referral code'
                });
            }

            sponsorId = sponsor.id;
            level = sponsor.level + 1;
        }

        // Create auth user
        const {
            data: authUser,
            error: authError
        } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true
        });

        if (authError) throw authError;

        const referralCode =
            generateReferralCode();

        const {
            data,
            error
        } = await supabase
            .from('users')
            .insert([{
                id: authUser.user.id,
                full_name,
                email,
                role: 'MLM_USER',
                referral_code: referralCode,
                sponsor_id: sponsorId,
                level
            }])
            .select();

        if (error) throw error;

        return res.status(201).json({
            success: true,
            data
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Downlines
const getDownlines = async (req, res) => {

    try {

        const userId =
            req.params.userId;

        const {
            data,
            error
        } = await supabase
            .from('users')
            .select('*')
            .eq(
                'sponsor_id',
                userId
            );

        if (error) throw error;

        return res.json({
            success: true,
            count: data.length,
            data
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    registerMLMUser,
    getDownlines
};