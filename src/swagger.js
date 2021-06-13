export default {
    openapi: "3.0.3",
    info: {
        title: "Online education system API",
        description: "Online education system API Documentation",
        version: "1.0.0",
        contact: {
            name: "Salohiddin",
        },
    },
    apis: ["**/*Route.js"],
    paths: {
        "/users/check-phone": {
            post: {
                tags: [{
                    name: "Users"
                }],
                summary: "Check user phone number validation",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    phone: {
                                        type: "string"
                                    }
                                },
                                example: {
                                    phone: "998935186780"
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: "Phone number is valid (exist)",
                    },
                    '500': {
                        description: "Internal server error"
                    }
                }
            }
        },
        "/users/signup": {
            post: {
                tags: [{
                    name: "Users"
                }],
                summary: "Register New User",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    phone: {
                                        type: "string"
                                    },
                                    name: {
                                        type: "string"
                                    },
                                    bdate: {
                                        type: "string"
                                    },
                                    gender: {
                                        type: "number"
                                    }
                                },
                                example: {
                                    phone: "998935186781",
                                    name: "Olim",
                                    bdate: "Sat Jun 05 2021 12:46:15 GMT+0500 (Pakistan Standard Time)",
                                    gender: 2
                                }
                            }
                        }
                    }
                },
                responses: {
                    '201': {
                        description: "User Created",
                    },
                    '400': {
                        description: "User did not created"
                    },
                    '500': {
                        description: "Internal server error"
                    }
                }
            }
        },
        "/users/login": {
            post: {
                tags: [{
                    name: "Users"
                }],
                summary: "Login User with sending sms to user phone number",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    phone: {
                                        type: "string"
                                    },
                                },
                                example: {
                                    phone: "998935186780",
                                }
                            }
                        }
                    }
                },
                responses: {
                    '201': {
                        description: "Code sent to user",
                    },
                    '401': {
                        description: "Code  not sent to user"
                    },
                    '500': {
                        description: "Internal server error"
                    }
                }
            }
        },
        "/users/validate-code": {
            post: {
                tags: [{
                    name: "Users"
                }],
                summary: "Validate sent code to user",
                parameters: [{
                    "in": "header",
                    required: true,
                    name: "code-Validation-Id",
                    value: "92bd06bb-0996-4976-acc8-ff9e26c1990d",
                    schema: {
                        type: "string",
                    }
                }],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    code: {
                                        type: "string"
                                    },
                                },
                                example: {
                                    code: "208547",
                                }
                            }
                        }
                    }
                },
                responses: {
                    '201': {
                        description: "Code is valid",
                    },
                    '401': {
                        description: "Code is invalid"
                    },
                    '500': {
                        description: "Internal server error"
                    }
                }
            },

        },
        "/users/edit": {
            securityDefinitions: {
                JWT: {
                    type: 'apiKey',
                    description: 'JWT authorization of an API',
                    name: 'Authorization',
                    in: 'header',
                },
            },
            parameters: [{
                name: "Authorization",
                "in": "header",
                required: true,
                value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3NDMxNDJmLTEzMDUtNGRhMy1hNTQxLWM1MTEwYjVjZGFhYSIsImlhdCI6MTYyMjkwMTk2M30.AVtHi1NttVEQhMPQw8r_XePFGSuleIdqEtjnbnpaF_g",
                schema: {
                    type: "string",
                }
            }],
            post: {
                tags: [{
                    name: "Users"
                }],
                summary: "Edit User Personal Data",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    phone: {
                                        type: "string"
                                    },
                                },
                                example: {
                                    name: "Salohiddin",
                                    gender: 2,
                                    bdate: "Thu Jan 01 1970 05:16:40 GMT+0500 (Pakistan Standard Time)"
                                }
                            }
                        }
                    }
                },
                responses: {
                    '202': {
                        description: "User Personale Data edited",
                    },
                    '400': {
                        description: "User Personal Data did not edited"
                    },
                    '500': {
                        description: "Internal server error"
                    }
                }
            },

        },
        "/users": {
            get: {
                tags: [{
                    name: "Users"
                }],
                summary: "Get Personal Data",
                parameters: [{
                    "in": "header",
                    required: true,
                    name: "Authorization",
                    value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3NDMxNDJmLTEzMDUtNGRhMy1hNTQxLWM1MTEwYjVjZGFhYSIsImlhdCI6MTYyMjg1NTgwNX0.lyj6SvyBlpdZ2OrJN1GInnXsRRXhZty2Rj1xoT_2nwI",
                    schema: {
                        type: "string",
                    }
                }],
                responses: {
                    '202': {
                        description: "User Personale Data edited",
                    },
                    '400': {
                        description: "User Personal Data did not edited"
                    },
                    '500': {
                        description: "Internal server error"
                    }
                }
            },

        },
        '/promoteUser': {
            post: {
            tags: [{
                name: "Users"
            }],
            summary: "Edit User Role",
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            example: {
                                user_id: "6609ba3c-01c9-4eba-ae89-b57e5cd366f2",
                                role: "admin"
                            }
                        }
                    }
                }
            },
            parameters: [{
                    "in": "header",
                    required: true,
                    name: "Authorization",
                    value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3NDMxNDJmLTEzMDUtNGRhMy1hNTQxLWM1MTEwYjVjZGFhYSIsImlhdCI6MTYyMjg1NTgwNX0.lyj6SvyBlpdZ2OrJN1GInnXsRRXhZty2Rj1xoT_2nwI",
                    schema: {
                        type: "string",
                    }
                },
                {
                    "in": "user.dataValues.role",
                    required: true,
                    name: "role",
                    value: 'admin || superAdmin',
                    schema: {
                        type: "string"
                    }
                }
            ],
            responses: {
                '202': {
                    description: "ok: true, Edited"
                },
                '400': {
                    description: "User role did not edited"
                }
            }
            }
            
        },
        '/editPhoto': {
            post: {
                tags: [{
                    name: "Users"
                }],
                summary: "Edit User photo",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: 'object'
                            },
                            example: {
                                file_id: "92bd06bb-0996-4976-acc8-ff9e26c1990d"
                            }
                        }
                    }
                },
                responses: {
                    "202": {
                        description: "Excapted"
                    },
                    "400": {
                        description: "Bad Request"
                    }
                }
            },
            parameters: [{
                "in": "header",
                required: true,
                name: "Authorization",
                value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3NDMxNDJmLTEzMDUtNGRhMy1hNTQxLWM1MTEwYjVjZGFhYSIsImlhdCI6MTYyMjg1NTgwNX0.lyj6SvyBlpdZ2OrJN1GInnXsRRXhZty2Rj1xoT_2nwI",
                schema: {
                    type: "string",
                }
            }],
        },
        '/file/create': {
            post: {
                tags: [{
                    name: "File"
                }],
                summary: "uploads an image",
                consumes: [
                    "multipart/form-data"
                ],
                produces: [
                    "application/json"
                ],
                parameters: [{
                    "in": "header",
                    required: true,
                    name: "Authorization",
                    value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3NDMxNDJmLTEzMDUtNGRhMy1hNTQxLWM1MTEwYjVjZGFhYSIsImlhdCI6MTYyMjg1NTgwNX0.lyj6SvyBlpdZ2OrJN1GInnXsRRXhZty2Rj1xoT_2nwI",
                    schema: {
                        type: "string",
                    }
                },
                {
                    "in": "formData",
                    required: true,
                    schema: {
                        type: "file",
                    },
                    name: "file to upload"
                }],
                responses: {
                    '202': {
                        description: "File uploaded"
                    },
                    '400': {
                        description: "Bad Request"
                    }
                }
            }
        },
        '/course': {
            get: {
                tags: [{
                    name: "Course"
                }],
                summary: "Get courses",
                parameters: [{
                    "in": "header",
                    required: true,
                    name: "Authorization",
                    value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3NDMxNDJmLTEzMDUtNGRhMy1hNTQxLWM1MTEwYjVjZGFhYSIsImlhdCI6MTYyMjg1NTgwNX0.lyj6SvyBlpdZ2OrJN1GInnXsRRXhZty2Rj1xoT_2nwI",
                    schema: {
                        type: "string",
                    }
                }],
                responses: {
                    "200": {
                        description: "findAll courses"
                    },
                    "400": {
                        description: "Bad request"
                    }
                }
            }
        },
        '/course/:course_id': {
            get: {
                tags: [{
                    name: "Course"
                }],
                summary: "Find courses by ID",
                operationId: "getOrderById",
                parameters: [
                    {
                        "in": "header",
                        required: true,
                        name: "Authorization",
                        value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3NDMxNDJmLTEzMDUtNGRhMy1hNTQxLWM1MTEwYjVjZGFhYSIsImlhdCI6MTYyMjg1NTgwNX0.lyj6SvyBlpdZ2OrJN1GInnXsRRXhZty2Rj1xoT_2nwI",
                        schema: {
                            type: "string",
                        }
                    },{
                    "in": "path",
                    required: true,
                    name: "orderId",
                    description: "ID of course that needs to be fetched",
                    schema: {
                        type: "integer"
                    },
                    format: "int64"
                }],
                responses: {
                    '200': {
                        description: "data: course"
                    },
                    '400': {
                        description: "Bad request"
                    }
                }
            }
        },
        '/patch': {
            patch: {
                tags: [{
                    name: "Admin"
                }],
                summary: "Edit site settings",
                description: "Edit settings",
                parameters: [{
                    "in": "header",
                    required: true,
                    name: "Authorization",
                    value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3NDMxNDJmLTEzMDUtNGRhMy1hNTQxLWM1MTEwYjVjZGFhYSIsImlhdCI6MTYyMjg1NTgwNX0.lyj6SvyBlpdZ2OrJN1GInnXsRRXhZty2Rj1xoT_2nwI",
                    schema: {
                        type: "string"
                    }
                },{
                    "in": "user.dataValues.role",
                    required: true,
                    name: "role",
                    value: 'superAdmin',
                    schema: {
                        type: "string"
                    }
                }
                ],
                responses: {
                    '200': {
                        description: "Updated"
                    },
                    '400': {
                        description: "Bad request"
                    }
                }
            }
        }
    }
}