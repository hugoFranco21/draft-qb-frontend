const PROXY_CONFIG = [
    {
        context: [
            "/rookie-prediction",
            "/should-draft",
            "/wins-expected",
        ],
        target: "http://localhost:8080",
        secure: false
    }
]

module.exports = PROXY_CONFIG;