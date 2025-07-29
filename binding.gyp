{
  "targets": [
    {
      "target_name": "nodesdr",
      "cflags!": ["-fno-exceptions"],
      "cflags_cc!": ["-fno-exceptions"],
      "sources": [
        "src/cpp/nodesdr.cpp",
        "src/cpp/plutosdr.cpp",
        "src/cpp/utils.cpp"
      ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "deps/include",
        "<!(node -e \"process.platform==='win32'?console.log('C:/Program Files/libiio/include'):process.platform==='darwin'?console.log('/usr/local/include') : console.log('/usr/include')\")"
      ],
      "dependencies": [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],
      "defines": [
        "NAPI_DISABLE_CPP_EXCEPTIONS",
        "NAPI_VERSION=9"
      ],
      "conditions": [
        ["OS=='win'", {
          "msvs_settings": {
            "VCCLCompilerTool": {
              "ExceptionHandling": 1,
              "AdditionalOptions": ["/std:c++17"]
            }
          },
          "defines": [
            "_WIN32_WINNT=0x0600"
          ],
          "libraries": [
            "<!(node -e \"try{console.log(require('./build/bindings.json').libiio)}catch(e){console.log('libiio.lib')}\")",
            "<!(node -e \"try{console.log(require('./build/bindings.json').libusb)}catch(e){console.log('libusb-1.0.lib')}\")",
            "<!(node -e \"try{console.log(require('./build/bindings.json').libxml2)}catch(e){console.log('libxml2.lib')}\")"
          ]
        }],
        ["OS=='mac'", {
          "xcode_settings": {
            "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
            "CLANG_CXX_LIBRARY": "libc++",
            "MACOSX_DEPLOYMENT_TARGET": "10.14",
            "CLANG_CXX_LANGUAGE_STANDARD": "c++17"
          },
          "libraries": [
            "<!(node -e \"try{console.log(require('./build/bindings.json').libiio)}catch(e){console.log('-liio')}\")",
            "<!(node -e \"try{console.log(require('./build/bindings.json').libusb)}catch(e){console.log('-lusb-1.0')}\")",
            "<!(node -e \"try{console.log(require('./build/bindings.json').libxml2)}catch(e){console.log('-lxml2')}\")"
          ]
        }],
        ["OS=='linux'", {
          "cflags_cc": [
            "-std=c++17",
            "-fexceptions"
          ],
          "libraries": [
            "<!(node -e \"try{console.log(require('./build/bindings.json').libiio)}catch(e){console.log('-liio')}\")",
            "<!(node -e \"try{console.log(require('./build/bindings.json').libusb)}catch(e){console.log('-lusb-1.0')}\")",
            "<!(node -e \"try{console.log(require('./build/bindings.json').libxml2)}catch(e){console.log('-lxml2')}\")"
          ]
        }]
      ]
    }
  ]
}