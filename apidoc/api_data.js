define({ "api": [
  {
    "type": "post",
    "url": "/api/user/v1/device",
    "title": "add device",
    "version": "1.0.0",
    "name": "add_device",
    "description": "<p>add device</p>",
    "group": "device",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "name",
            "description": "<p>device name</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "macId",
            "description": "<p>device macId</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "relay",
            "description": "<p>device relay count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success:true,\n     message:\"دستگاه با موفقیت ثبت شد\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success:false,\n     message:\"دستگاهی با این مک آیدی وجود دارد\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/device.js",
    "groupTitle": "device"
  },
  {
    "type": "get",
    "url": "/api/user/v1/device",
    "title": "get devices",
    "version": "1.0.0",
    "name": "get_devices",
    "description": "<p>get devices</p>",
    "group": "device",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      success:true,\n      message:\"دستگاه های کاربر با موفقیت ارسال شد\",\n      data: [...{\n                _id: id,\n                active: active,\n                name: name,\n                macId: macId,\n                ownerId: ownerId,\n                relay:[...{no: number, status: status}],\n                user: [...user ids],\n            }]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n      success:false,\n      message:\"دستگاه های کاربر با موفقیت ارسال نشد\",\n      data: []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/device.js",
    "groupTitle": "device"
  },
  {
    "type": "get",
    "url": "/api/user/v1/device/owner",
    "title": "get owner devices",
    "version": "1.0.0",
    "name": "get_owner_devices",
    "description": "<p>get owner devices</p>",
    "group": "device",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      success:true,\n      message:\"دستگاه های کاربر با موفقیت ارسال شد\",\n      data: [...{\n                _id: id,\n                active: active,\n                name: name,\n                macId: macId,\n                ownerId: ownerId,\n                relay:[...{no: number, status: status}],\n                user: [...{name: name, family: family, username: username}],\n            }]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n      success:false,\n      message:\"دستگاه های کاربر با موفقیت ارسال نشد\",\n      data: []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/device.js",
    "groupTitle": "device"
  },
  {
    "type": "put",
    "url": "/api/user/v1/device/relay",
    "title": "update devices status",
    "version": "1.0.0",
    "name": "put_devices",
    "description": "<p>put devices</p>",
    "group": "device",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "name",
            "description": "<p>device name</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "deviceId",
            "description": "<p>device id</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "relayNumber",
            "description": "<p>device relay number</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"status\":true,\n       message:\"اطلاعات دستگاه اپدیت شد\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n       success:false,\n       message:\"دستگاهی با این اطلاعات موجود نیست\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/device.js",
    "groupTitle": "device"
  },
  {
    "type": "post",
    "url": "/api/user/v1/device/share",
    "title": "share device",
    "version": "1.0.0",
    "name": "share_devices",
    "description": "<p>share device with other users</p>",
    "group": "device",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "username",
            "description": "<p>username</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "deviceId",
            "description": "<p>device id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"status\": true,\n       \"message\": \"با موفقیت انجام شد\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n       \"success\":false,\n       \"message\": \"دستگاهی با این آیدی وجود ندارد\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/device.js",
    "groupTitle": "device"
  },
  {
    "type": "post",
    "url": "/api/user/v1/device/stopShare",
    "title": "stop share device",
    "version": "1.0.0",
    "name": "stop_sharing_devices",
    "description": "<p>stop share device</p>",
    "group": "device",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "username",
            "description": "<p>username</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "deviceId",
            "description": "<p>device id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"status\": true,\n       \"message\": \"دسترسی کاربر به دستگاه مسدود شد\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n       \"success\":false,\n       \"message\": \"دستگاهی با این آیدی وجود ندارد\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/device.js",
    "groupTitle": "device"
  },
  {
    "type": "put",
    "url": "/api/user/v1/device/toggle",
    "title": "toggle device activity",
    "version": "1.0.0",
    "name": "toggle_device",
    "description": "<p>toggle devices</p>",
    "group": "device",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "deviceId",
            "description": "<p>device id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"status\":true,\n       message:\"عملیات با موفقیت انجام شد\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n       success:false,\n       message:\"دستگاهی با این آیدی وجود ندارد\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/device.js",
    "groupTitle": "device"
  },
  {
    "type": "get",
    "url": "/api/device/v1/",
    "title": "update device",
    "version": "1.0.0",
    "name": "update_device",
    "description": "<p>update device</p>",
    "group": "device",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "macId",
            "description": "<p>device macId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success:true,\n    message:\"device data sent successfully\",\n    data: [...{no: number, status: status }]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    success:false,\n    message:\"unable to send device data\",\n    data: []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/device/v1/home.js",
    "groupTitle": "device"
  },
  {
    "type": "post",
    "url": "/api/user/v1/login/mobile/check",
    "title": "check Verification Code",
    "version": "1.0.0",
    "name": "checkVerificationCode",
    "description": "<p>checkVerificationCode</p>",
    "group": "home",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "mobile",
            "description": "<p>user mobile</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "code",
            "description": "<p>user code</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success:true,\n     message:\"کد تایید صحیح است\",\n     data:{\n         idToken: idToken, \n         accessToken: accessToken\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success:false,\n     message:\"کد تایید صحیح نمی باشد\",\n     data: {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/home.js",
    "groupTitle": "home"
  },
  {
    "type": "post",
    "url": "/api/user/v1/app/info",
    "title": "app info",
    "version": "1.0.0",
    "name": "info",
    "description": "<p>app info</p>",
    "group": "home",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "versionCode",
            "description": "<p>versionCode</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "os",
            "description": "<p>os</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  status: true,\n  message:\"اطلاعات نرم افزار فرستاده شد\",\n  data:{\n      update:false,\n      updateUrl:\"http://cafebazar.com/ir.team-x.ir/mohsenapp,\n      force:false\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n   status: false,\n   message:\"کاربر بلاک می باشد\",\n   data:{}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/home.js",
    "groupTitle": "home"
  },
  {
    "type": "post",
    "url": "/api/user/v1/login",
    "title": "login",
    "version": "1.0.0",
    "name": "login",
    "description": "<p>login user</p>",
    "group": "home",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "username",
            "description": "<p>user username</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "password",
            "description": "<p>user password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success:true,\n    message:\"کاربر با موفقیت وارد شد\",\n    data:{\n         idToken: idToken, \n         accessToken: accessToken\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success:false,\n     message:\"کاربر وارد نشد\",\n     data:{}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/home.js",
    "groupTitle": "home"
  },
  {
    "type": "post",
    "url": "/api/user/v1/",
    "title": "register",
    "version": "1.0.0",
    "name": "register",
    "description": "<p>register user</p>",
    "group": "home",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "username",
            "description": "<p>user username</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "password",
            "description": "<p>user password</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "name",
            "description": "<p>name</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "family",
            "description": "<p>family</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "email",
            "description": "<p>email</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "mobile",
            "description": "<p>mobile</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success:true,\n    message:\"کاربر با موفقیت ثبت شد\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    success:false,\n    message:\"کاربری با این مشخصات موجود است\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/home.js",
    "groupTitle": "home"
  },
  {
    "type": "post",
    "url": "/api/user/v1/login/mobile",
    "title": "requset verification Code",
    "version": "1.0.0",
    "name": "verificationCode",
    "description": "<p>requset verification Code</p>",
    "group": "home",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "mobile",
            "description": "<p>user mobile</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     success:true,\n     message: \"کد تاییدیه به شماره موبایل داده شده ، با موفقیت فرستاده شد\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success:false,\n     message:\"کاربری با این شماره موبایل در دسترس نمی باشد\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/home.js",
    "groupTitle": "home"
  }
] });
