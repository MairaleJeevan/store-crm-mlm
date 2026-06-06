export const permissions = {

    SUPER_ADMIN: [
        '/dashboard',
        '/customers',
        '/products',
        '/sales',
        '/inventory',
        '/commissions',
        '/reports',
        '/users',
        '/exports',
        '/mlm-tree',
        'user-management',
        '/reminders'
    ],

    ADMIN: [
        '/dashboard',
        '/customers',
        '/products',
        '/sales',
        '/inventory',
        '/reports',
        '/reminders',
        '/users'
    ],

    SALES_EXECUTIVE: [
        '/dashboard',
        '/customers',
        '/sales',
        '/reminders'
    ],

    MLM_USER: [
        '/dashboard',
        '/commissions',
        '/mlm-tree'
    ]
};