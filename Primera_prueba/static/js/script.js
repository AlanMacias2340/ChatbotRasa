var chatContainer = document.getElementById("chat-widget-messages");
//cargar comletamente el DOM
$(document).ready(function () {
    $("#chat-widget-button").on("click", function () {
        $("#chat-widget").toggleClass("d-none"); //oculta clase
    });

    $("#chat-widget-close-button").on("click", function () {
        $("#chat-widget").addClass("d-none"); //agrega clase
    });

    $("#chat-widget-input").keypress(function (event) {
        if (event.which === 13) {
            let userMessage = $("#chat-widget-input").val(); // Definir userMessage
            $("#chat-widget-input").val("");
            $("#chat-widget-messages").append(
                "<div><strong>You: </strong>" + userMessage + "</div>"
            );
            $.ajax({
                type: "POST",
                url: "/webhook",
                contentType: "application/json",
                data: JSON.stringify({ message: userMessage }), // Usar userMessage
                success: function (data) {
                    let botResponse = data.response;

                    // Append bot's response to the chatbox
                    $("#chat-widget-messages").append(
                        "<div><strong>Bot:</strong> " + botResponse + "</div>"
                    );
                },
                error: function () {
                    // Handle error if needed
                },
            });

            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    });
});