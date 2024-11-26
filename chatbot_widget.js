(function (window, document) {
  const ChatWidget = {
    init: function (config) {
      const { apiKey, containerId = "MR-chatbot-section" } = config;




      if (config.apiKey === "MR_Widget") {
        this.injectGoogleFonts();
        this.injectStyles(apiKey);
        this.renderChatWidget(config, containerId);
      }else {
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
      styleTag.innerHTML = `:root{
    --lightblue : ${style.primary_color};
    --purple:#724ae8;
}
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}
body{
    background-color: var(--lightblue);
}
.chatbot{
    position: fixed;
    bottom: 100px;
    right: 40px;
    background-color: #fff;
    width: 420px;
    border-radius: 15px;
    overflow: hidden;
    transform: scale(0.5);
    opacity: 0;
    transition: all 0.2s linear ;

}
.show-chatbot .chatbot{
    transform: scale(1);
    opacity: 1;
    transition: all 0.2s linear ;
}
.chatbot header{
    background-color: var(--purple);
    text-align: center;
    padding: 16px 0;
    position: relative;
}
.chatbot header .close-icon{
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    color: #fff;
    display: none;
}
.chatbot header h2{
    color: #fff;
    font-size: 1.4rem;
}
.chatbot .chatbox{
    height: 510px;
    overflow-y: auto;
    padding: 15px 20px 70px;
}
.chatbot .chat{
    display: flex;
}
.chatbox p{
    background-color: var(--purple);
    border-radius: 10px 10px 0px 10px;
    padding: 12px 16px;
    color: #fff;
    font-size: 0.95rem;
    max-width: 75%;
}
.chatbox .incoming {
    margin-top: 7px;

}
.chatbox .incoming p{
    background-color: #f2f2f2;
    color: #000;
}
.chatbox .smart-toy{
    height: 32px;
    width: 32px;
    align-self: flex-end;
    background-color: var(--purple);
    color: #fff;
    text-align: center;
    margin: 0 10px 7px 0;
    line-height: 32px;
    border-radius: 4px;
}
.chatbox .outgoing{
    margin: 20px 0;
    justify-content: flex-end;
}
.chatbot .chat-input{
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #ccc;
    padding: 5px 20px;
    display: flex;
    gap: 5px;
}
.chat-input textarea{
    border: none;
    outline: none;
    font-size: 0.95rem;
    resize: none;
    padding: 16px 15px 16px 0;
    width: 100%;
    height: px;
}
#send-btn{
    color: var(--purple);
    font-size: 1.5rem;
    cursor: pointer;
    align-self: center;
    visibility: hidden;
}
.chat-input textarea:valid ~ #send-btn{
    visibility: visible;
}
.chatbot-toggler{
    position: fixed;
    bottom: 40px;
    right: 35px;
    background-color: var(--purple);
    color: #fff;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.chatbot-toggler p{
    position: absolute;
}
.chatbot-toggler .message-icon{
    opacity: 1;
}
.chatbot-toggler .close-icon{
    opacity: 0;
}
.show-chatbot .chatbot-toggler .message-icon{
    opacity: 0;
}
.show-chatbot .chatbot-toggler .close-icon{
    opacity: 1;
}

/* media-queries */

@media (max-width:490px){
    .chatbot{
        width: 100%;
        height: 100%;
        bottom: 0;
        right: 0;
        z-index: 1;
    } 
    .chatbot header{
        background-color: var(--purple);
        text-align: center;
        padding: 30px 0;
        position: relative;
    }  
    .chatbot .chatbox{
        height: 90%;
    }
    .chatbot header .close-icon{
        display: block;
    }
    .chatbot{
        opacity: 0 !important;
    }
    .show-chatbot  .chatbot{
        opacity: 1 !important;
    }
}`;
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
             <div class="chatbot">
        <header>
            <h2>${config.apiKey}</h2>
            <p class="material-symbols-outlined close-icon chatbot-close-icon">close</p>
        </header>

        <ul class="chatbox">
            <li class="chat incoming">
                <span class="material-symbols-outlined smart-toy">smart_toy</span>
                <p>Hi there 👋 <br>How can I help you today?</p>
            </li>
            <li class="chat outgoing">
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
            </li>
        </ul>

        <div class="chat-input">
            <textarea placeholder="Enter a message..." required></textarea>
            <span id="send-btn" class="material-symbols-outlined">send</span>
        </div>
    </div>

    <!-- Chatbot toggler -->
    <div class="chatbot-toggler">
        <p class="material-symbols-outlined message-icon">mode_comment</p>
        <p class="material-symbols-outlined close-icon">close</p>
    </div>
            `;

      this.initializeChatLogic(container);
    },
    initializeChatLogic: function (container) {
      const toggler = document.querySelector(".chatbot-toggler");
      const chatBotCloseIcon = document.querySelector(".chatbot-close-icon");
      const body = document.querySelector(".body");

      const handleToggler = () => {
        body.classList.toggle("show-chatbot");
      };

      toggler.addEventListener("click", handleToggler);
      chatBotCloseIcon.addEventListener("click", () => {
        body.classList.toggle("show-chatbot");
      });
    },
  };

  window.ChatWidget = ChatWidget;
})(window, document);
