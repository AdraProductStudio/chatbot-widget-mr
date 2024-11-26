(function (window, document) {
    const ChatWidget = {
        init: function (config) {
            const { apiKey, containerId = "MR-chatbot-section" } = config;

            if (config.apiKey === "MR_Widget") {
                this.injectStyles(apiKey); 
                this.injectGoogleFonts();
                this.renderChatWidget(config, containerId); 
            } else {
                alert("Invalid API key")
            }
        },

        injectGoogleFonts: function () {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap";
            document.head.appendChild(link);
        },

        injectStyles: function (style) {
            const styleTag = document.createElement("style");
            styleTag.innerHTML = `
                :root {
                    --lightblue: #e3f2fd;
                    --purple: #724ae8;
                    --blue: #0275d8;
                }

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Poppins', sans-serif;
                }
                .MR-chatbot {
                    position: fixed;
                    bottom: 100px;
                    right: 40px;
                    background-color: #fff;
                    width: 420px;
                    border-radius: 15px;
                    overflow: hidden;
                    transform: scale(0.5);
                    opacity: 0;
                    transition: all 0.2s linear;
                    border: 1px solid rgb(228, 228, 228);
                    z-index: 1000
                }
                .MR-show-chatbot .MR-chatbot {
                    transform: scale(1);
                    opacity: 1;
                    transition: all 0.2s linear;
                }
                .MR-chatbot header {
                    background-color: #31363F;
                    text-align: center;
                    padding: 30px 0;
                    position: relative;
                }
                .MR-chatbot header .close-icon {
                    position: absolute;
                    top: 50%;
                    right: 20px;
                    transform: translateY(-50%);
                    color: #fff;
                    display: none;
                }
                .MR-chatbot header h2 {
                    color: #fff;
                    font-size: 1.4rem;
                    margin-bottom: 0;
                }
                .MR-chatbot .MR-chatbox {
                    height: 510px;
                    overflow-y: scroll;
                    padding: 15px 20px 70px;
                }
                .MR-chatbot .chat {
                    display: flex;
                }
                .MR-chatbox .incoming {
                    margin-top: 7px;
                }
                .MR-chatbox .smart-toy {
                    height: 32px;
                    width: 32px;
                    align-self: flex-end;
                    background-color: #31363F;
                    color: #fff;
                    text-align: center;
                    margin: 0 10px 7px 0;
                    line-height: 32px;
                    border-radius: 4px;
                }
                .MR-chatbox .outgoing {
                    margin: 20px 0;
                    justify-content: flex-end;
                }
                .MR-chatbot .MR-chat-input {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    border-top: 1px solid #ccc;
                    padding: 0px 20px;
                    display: flex;
                    gap: 5px;
                    background: #fff;
                }
                .MR-chat-input textarea {
                    border: none;
                    outline: none;
                    font-size: 0.95rem;
                    resize: none;
                    padding: 16px 15px 16px 0;
                    width: 100%;
                    height: px;
                }
                .MR-chatbot #MR-send-btn {
                    color: #31363F;
                    font-size: 1.5rem;
                    cursor: pointer;
                    align-self: center;
                    pointer-events: none;
                    opacity: 25%;
                }
                .MR-chat-input textarea:valid~#MR-send-btn {
                    visibility: visible;
                    pointer-events: all;
                    opacity: 100%;
                }
                .MR-chatbot-toggler {
                    position: fixed;
                    bottom: 40px;
                    right: 35px;
                    background-color: #31363F;
                    color: #fff;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }
                .MR-chatbot-toggler p {
                    position: absolute;
                }
                .MR-chatbot-toggler .message-icon {
                    opacity: 1;
                    margin-bottom: 0;
                }
                .MR-chatbot-toggler .close-icon {
                    opacity: 0;
                    margin-bottom: 0;
                }
                .MR-show-chatbot .MR-chatbot-toggler .message-icon {
                    opacity: 0
                }
                .MR-show-chatbot .MR-chatbot-toggler .close-icon {
                    opacity: 1;
                }
                .user-icon,
                .bot-icon {
                    width: 30px;
                    height: 30px;
                }
                .MR-chatbot .placeholder-msg {
                    display: flex;
                    width: 85%;
                    margin-bottom: 1rem;
                }
                .MR-chatbot .incoming-msg {
                    display: flex;
                    width: 85%;
                    margin-bottom: 1rem;
                }
                .MR-chatbot .botText {
                    color: #000;
                    font-weight: normal;
                    font-size: 14px;
                    text-align: left;
                    margin-bottom: 1rem;
                }
                .MR-chatbot .botText span {
                    line-height: 1.5em;
                    display: inline-block;
                    background-color: #31363F;
                    color: #fff;
                    padding: 10px;
                    border-radius: 8px;
                    border-bottom-left-radius: 2px;
                    max-width: 100%;
                    margin-left: 10px;
                    animation: floatup .5s forwards;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                    hyphens: auto;
                }
                .MR-chatbot .placeholder-msg-text {
                    line-height: 1.5em;
                    display: inline-block;
                    background-color: #47484c;
                    color: #fff;
                    font-size: 14px;
                    padding: 10px;
                    border-radius: 8px;
                    border-top-left-radius: 2px;
                    max-width: 100%;
                    margin-left: 10px;
                    animation: floatup .5s forwards;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                    hyphens: auto;
                }
                .MR-chatbot .incoming-msg-text {
                    line-height: 1.5em;
                    display: inline-block;
                    background-color: #47484c;
                    color: #fff;
                    font-size: 14px;
                    padding: 10px;
                    border-radius: 8px;
                    border-top-left-radius: 2px;
                    max-width: 100%;
                    margin-left: 10px;
                    animation: floatup .5s forwards;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                    hyphens: auto;
                }
                .MR-chatbot .outgoing-msg {
                    display: flex;
                    float: right;
                    width: 75%;
                    justify-content: end;
                }
                .MR-chatbot .incoming-timeFontSize {
                    float: right;
                    margin-top: 30px;
                }
                .MR-chatbot .placeholder-msg-time {
                    float: right;
                    margin-top: 30px;
                    font-size: 12px;
                }
                .MR-chatbot .incoming-msg-time {
                    float: right;
                    margin-top: 30px;
                    font-size: 12px;
                }
                .MR-chatbot .outgoing-msg-time {
                    float: right;
                    margin-top: 30px;
                    font-size: 12px;
                }
                .MR-chatbot .outgoing-msg-text {
                    margin-right: 10px;
                    background: #e3e2e2 !important;
                    color: #000;
                    font-size: 14px;
                    padding: 10px;
                    border-radius: 8px;
                    border-top-right-radius: 2px;
                    font-size: 14px;
                    margin-bottom: 1rem;
                    word-wrap: break-word;
                    word-break: break-word;
                    max-width: 100%;
                }
                .d-none {
                    display: none;
                }


                /* media-queries */
                @media (max-width:490px) {
                    .MR-chatbot {
                        width: 100%;
                        height: 100%;
                        bottom: 0;
                        right: 0;
                        z-index: 1;
                    }
                    .MR-chatbot header {
                        background-color: #31363F;
                        text-align: center;
                        padding: 30px 0;
                        position: relative;
                    }
                    .MR-chatbot header .close-icon {
                        display: block;
                    }
                    .MR-chatbot {
                        opacity: 0 !important;
                    }
                    .MR-show-chatbot .MR-chatbot {
                        opacity: 1 !important;
                    }
                } `;
            document.head.appendChild(styleTag);
        },

        renderChatWidget: function (config, containerId) {
            let container = document.getElementById(containerId);
            if (!container) {
                container = document.createElement("div");
                container.id = containerId;
                document.body.appendChild(container);
            }

            container.innerHTML = `
                        <div id="MR-chatbot-section" class="MR-chatbot-section">
                            <div class="MR-chatbot">
                                <header class="MR-header">
                                <h2 class="MR-h2">MR Agent</h2>
                                <p class="MR material-symbols-outlined close-icon MR-chatbot-close-icon">close</p>
                                </header>
                                <div class="MR-chat-container" id="MR-chat-container">
                                <ul class="MR-chatbox" id="MR-chatbox">
                                    <div class="d-flex incoming-msg" id="incoming-msg-box">
                        
                                    </div>
                                </ul>
                                </div>
                                <div class="MR-chat-input">
                                <textarea autofocus="" class="MR-userInputText" id="MR-userInputText" placeholder="Enter a message..."
                                    required=""></textarea>
                                <span class="material-symbols-outlined" id="MR-send-btn">send</span>
                                </div>
                            </div>
                            <div class="MR-chatbot-toggler">
                                <p class="material-symbols-outlined message-icon">mode_comment</p>
                                <p class="material-symbols-outlined close-icon">close</p>
                            </div>
                        </div>`;

            this.initializeChatLogic(container);
        },

        initializeChatLogic: function (container) {
            let timerRef = null;
            let randomNumber = null;
            let apiToken;
            let apiResponseMessage;

            const MRChatbotSection = document.getElementById('MR-chatbot-section')
            MRChatbotSection.className = "MR-chatbot-section"
            const MRChatboxUl = document.getElementById("MR-chatbox")
            const MRUserInputText = document.getElementById("MR-userInputText")
            const MRSendbtnSpan = document.getElementById("MR-send-btn")

            const toggler = document.querySelector(".MR-chatbot-toggler");
            const chatBotCloseIcon = document.querySelector(".MR-chatbot-close-icon");

            const incomingMsgBox = document.getElementById("incoming-msg-box");
            incomingMsgBox.className = "d-flex placeholder-msg";
            const botIcon = document.createElement("img");
            botIcon.className = "bot-icon";
            botIcon.setAttribute(
                "src",
                "https://modelrocket.matsuritech.com/static/media/model-rocket-bot.4126f760133924edc8a02fd208464bdf.svg"
            );
            const incomingMsgText = document.createElement("p");
            incomingMsgText.className = "placeholder-msg-text";
            incomingMsgText.innerHTML = `...`;
            const incomingMsgTime = document.createElement("i");
            incomingMsgTime.className = "placeholder-msg-time";
            incomingMsgTime.innerText = formatAMPM(new Date());
            incomingMsgText.append(incomingMsgTime);
            const bottomChat = document.createElement("div");
            incomingMsgBox.append(botIcon, incomingMsgText, bottomChat);
            MRChatboxUl.append(incomingMsgBox);

            const randomNumberGenerate = () => {
                return Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;
            }

            function formatAMPM(date) {
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var ampm = hours >= 12 ? "pm" : "am";
                hours = hours % 12;
                hours = hours ? hours : 12;
                minutes = minutes < 10 ? "0" + minutes : minutes;
                var strTime = hours + ":" + minutes + " " + ampm;
                return strTime;
            }

            const welcomeMessage = async () => {
                toggler.style.pointerEvents = "none"
                toggler.style.opacity = "0.5"
                await generateToken();
            };

            const generateToken = async () => {
                const url = "https://consumertestapi.matsuritech.com/gettoken";
                const username = "matsuri"; // Replace with your username
                const password =
                    "fc153ac36455604c6a6bcb3e22c0a4debfb746d59ad4a33a4b0d50f315206958d78da64e88957993e537e5ef235537a65ac0bc8fbaa725ae3e8e151617e82b81";
                const base64Credentials = btoa(`${username}:${password}`);

                fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: `Basic ${base64Credentials}`,
                    },
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then((data) => {
                        if (data.error_code === 200) {
                            apiToken = data.data.token;
                            (async () => {
                                await getResponse("init", "");
                            })();
                        }
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            };

            const getResponse = async (flag, userInputTextValue) => {
                console.log(flag)
                var requiredParams;
                var dataObject;

                requiredParams = {
                    client_name: "ModelRocket",
                    service_name: "Sales Knowledge Worker MR",
                    language: "english",
                    msg: userInputTextValue,
                    flag: flag,
                    session_id: randomNumber,
                };

                const url = "https://consumertestapi.matsuritech.com/chatbot_widget";

                await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${apiToken}`,
                    },
                    body: JSON.stringify(requiredParams),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then((data) => {
                        toggler.style.pointerEvents = "all"
                        toggler.style.opacity = "1"

                        dataObject = data.data
                        incomingMsgBox.className = "d-none"
                        if (data.error_code === 201) {
                            apiResponseMessage = data.data.message;
                            clearTimeout(timerRef);
                            randomNumber = randomNumberGenerate()
                            setTimeout(() => {
                                handleToggler()
                            }, 1500);
                        }
                        else {
                            apiResponseMessage = data.data.message;
                            resetIdleTracking("continous");
                        }
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });

                if (Object.keys(dataObject).length === 0) {
                    console.log(dataObject)
                } else if (Object.keys(dataObject).length) {
                    const incomingMsgBox = document.createElement("div");
                    incomingMsgBox.className = "d-flex incoming-msg";
                    const botIcon = document.createElement("img");
                    botIcon.className = "bot-icon";
                    botIcon.setAttribute(
                        "src",
                        "https://modelrocket.matsuritech.com/static/media/model-rocket-bot.4126f760133924edc8a02fd208464bdf.svg"
                    );
                    const incomingMsgText = document.createElement("div");
                    incomingMsgText.className = "incoming-msg-text";
                    incomingMsgText.innerHTML = `${apiResponseMessage}`;
                    let linkText = incomingMsgText.querySelector('a')
                    if (linkText) {
                        linkText.style.color = '#fff';
                        linkText.style.textDecoration = 'underline';
                    }
                    const incomingMsgTime = document.createElement("i");
                    incomingMsgTime.className = "incoming-msg-time";
                    incomingMsgTime.innerText = formatAMPM(new Date());
                    incomingMsgText.append(incomingMsgTime);
                    const bottomChat = document.createElement("div");
                    incomingMsgBox.append(botIcon, incomingMsgText, bottomChat);
                    MRChatboxUl.append(incomingMsgBox);
                    bottomChat.scrollIntoView({ behavior: "smooth" });
                } else {
                    const incomingMsgBox = document.createElement("div");
                    incomingMsgBox.className = "d-flex incoming-msg";
                    const botIcon = document.createElement("img");
                    botIcon.className = "bot-icon";
                    botIcon.setAttribute(
                        "src",
                        "https://modelrocket.matsuritech.com/static/media/model-rocket-bot.4126f760133924edc8a02fd208464bdf.svg"
                    );
                    const incomingMsgText = document.createElement("p");
                    incomingMsgText.className = "incoming-msg-text";
                    incomingMsgText.innerHTML = `Something went wrong.Please try again later!`;
                    const incomingMsgTime = document.createElement("i");
                    incomingMsgTime.className = "incoming-msg-time";
                    incomingMsgTime.innerText = formatAMPM(new Date());
                    incomingMsgText.append(incomingMsgTime);
                    const bottomChat = document.createElement("div");
                    incomingMsgBox.append(botIcon, incomingMsgText, bottomChat);
                    MRChatboxUl.append(incomingMsgBox);
                    bottomChat.scrollIntoView({ behavior: "smooth" });
                }
            };


            const handleSendClick = () => {
                const outgoingMsgBox = document.createElement("div");
                outgoingMsgBox.className = "d-flex outgoing-msg";
                const outgoingMsgText = document.createElement("p");
                const userIcon = document.createElement("img");
                outgoingMsgText.className = "outgoing-msg-text";
                outgoingMsgText.innerText = MRUserInputText.value;
                const outgoingMsgTime = document.createElement("i");
                outgoingMsgTime.className = "outgoing-msg-time";
                outgoingMsgTime.innerText = formatAMPM(new Date());
                outgoingMsgText.append(outgoingMsgTime);
                userIcon.id = "user-icon";
                userIcon.className = "user-icon";
                userIcon.setAttribute(
                    "src",
                    "https://static.vecteezy.com/system/resources/previews/016/079/150/non_2x/user-profile-account-or-contacts-silhouette-icon-isolated-on-white-background-free-vector.jpg"
                );
                outgoingMsgBox.append(outgoingMsgText, userIcon);

                const bottomChat = document.createElement("div");
                MRChatboxUl.append(outgoingMsgBox, bottomChat);
                bottomChat.scrollIntoView({ behavior: "smooth" });
                setTimeout(() => {
                    getResponse("step", MRUserInputText.value);
                    MRUserInputText.value = "";
                    bottomChat.scrollIntoView({ behavior: "smooth" });
                }, 0);
            }

            MRSendbtnSpan.addEventListener('click', handleSendClick)
            MRUserInputText.addEventListener('keypress', (e) => {
                if (e.key === "Enter") {
                    if (MRUserInputText.value.trim() === "") {
                        e.preventDefault();
                        return;
                    } else {
                        e.preventDefault();
                        handleSendClick();
                    }
                }
            })


            const handleToggler = async () => {
                MRChatbotSection.classList.toggle("MR-show-chatbot");
                incomingMsgBox.className = "d-flex placeholder-msg";
                MRChatboxUl.append(incomingMsgBox);

                if (MRChatbotSection.className.includes("MR-show-chatbot")) {
                    (async () => {
                        await welcomeMessage();
                    })();
                    randomNumber = randomNumberGenerate()
                    console.log(randomNumber)
                } else {
                    MRChatboxUl.innerHTML = "";
                    MRUserInputText.value = ""
                    resetIdleTracking("close")
                }

            };

            const resetIdleTracking = (value) => {
                if (timerRef) {
                    clearTimeout(timerRef);
                }
                if (value === "close") {
                    console.log("closed")
                    startIdleTracking("close"); // Restart idle tracking
                } else {
                    startIdleTracking("continous")
                }
            };

            const startIdleTracking = (value) => {
                if (value === "close") {
                    MRChatboxUl.innerHTML = "";
                    return
                }
                timerRef = setTimeout(async () => {
                    const response = await getResponse("step", "");
                    if (response) {
                        resetIdleTracking("continous");
                    }
                }, 5000); // First idle check after specified timeout
            };

            toggler.addEventListener("click", handleToggler);
            chatBotCloseIcon.addEventListener("click", () => {
                MRChatbotSection.classList.toggle("MR-show-chatbot");
            });
        },
    };

    window.ChatWidget = ChatWidget;
})(window, document);



