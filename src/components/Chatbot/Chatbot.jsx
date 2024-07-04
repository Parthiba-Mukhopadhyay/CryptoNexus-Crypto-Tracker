import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "tailwindcss/tailwind.css";
import Fab from "@mui/material/Fab";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography, TextField, Button } from "@mui/material";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("Tell me more about Crypto!");
  const [loading, setLoading] = useState(false);
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const chatEndRef = useRef(null);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, user: true }];
      setMessages(newMessages);
      setInput("");

      try {
        setLoading(true);
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${YOUR_GEMINI_API_KEY}`,
          {
            contents: [
              {
                parts: [
                  {
                    text: input,
                  },
                ],
              },
            ],
          }
        );
        console.log(response);
        const botResponse = response.data.candidates[0].content.parts[0].text;
        setLoading(false);
        setMessages([...newMessages, { text: botResponse, user: false }]);
      } catch (error) {
        console.error("Error sending message:", error);
        setLoading(false);
        setMessages([
          ...newMessages,
          { text: "Error: Could not get response from AI", user: false },
        ]);
      }
    }
  };

  useEffect(() => {
    if (isChatbotVisible && messages.length === 0) {
      setMessages([
        {
          text: "Hello 👋, Your friendly assistant here! How can I help you?",
          user: false,
        },
      ]);
    }
  }, [isChatbotVisible]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="fixed top-3/4 mt-28 md:mt-20 right-12 flex flex-col items-end h-screen z-50 pointer-events-none">
      <Fab
        color="primary"
        aria-label={isChatbotVisible ? "close" : "open"}
        onClick={() => setIsChatbotVisible(!isChatbotVisible)}
        className="pointer-events-auto"
        sx={{
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
          "&:hover": {
            background: "linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)",
          },
        }}
      >
        {isChatbotVisible ? <CloseIcon /> : <ChatIcon />}
      </Fab>
      {isChatbotVisible && (
        <Box
          sx={{
            backgroundColor: "white",
            width: { xs: "90%", sm: "70%", md: "50%", lg: "30%" },
            height: "70vh",
            boxShadow: 6,
            borderRadius: 4,
            overflow: "hidden",
            position: "fixed",
            zIndex: 50,
            bottom: 96,
            right: { xs: 0, sm: 20, md: 40, lg:60 },
            margin: 2,
            pointerEvents: "auto",
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
              padding: 2,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              border: 1,
            }}
          >
            <Typography
              variant="h5"
              component="h1"
              sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}
            >
              Welcome to Crypto Nexus
            </Typography>
          </Box>
          <Box
            sx={{ padding: 2, height: "calc(100% - 156px)", overflowY: "auto" }}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: msg.user ? "flex-end" : "flex-start",
                  marginBottom: 1,
                }}
              >
                <Box
                  sx={{
                    borderRadius: 3,
                    padding: 1,
                    boxShadow: 2,
                    backgroundColor: msg.user ? "#90caf9" : "#1976d2",
                    color: "white",
                    maxWidth: "85%",
                  }}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </Box>
              </Box>
            ))}
            {loading && (
              <Box
                sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      backgroundColor: "#42a5f5",
                      borderRadius: "50%",
                      animation: "bounce 1.5s infinite",
                    }}
                  ></Box>
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      backgroundColor: "#42a5f5",
                      borderRadius: "50%",
                      animation: "bounce 1.5s infinite 0.2s",
                      marginLeft: 1,
                    }}
                  ></Box>
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      backgroundColor: "#42a5f5",
                      borderRadius: "50%",
                      animation: "bounce 1.5s infinite 0.4s",
                      marginLeft: 1,
                    }}
                  ></Box>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: "#42a5f5", marginLeft: 1 }}
                >
                  Loading
                </Typography>
              </Box>
            )}
            <div ref={chatEndRef} />
          </Box>
          <Box
            sx={{
              padding: 2,
              borderTop: "1px solid #e0e0e0",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              sx={{
                marginRight: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#90caf9",
                    borderRadius: "16px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#42a5f5",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1976d2",
                  },
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              sx={{
                padding: "10px",
                minWidth: "50px",
                minHeight: "50px",
                borderRadius: "50%",
              }}
            >
              <FaPaperPlane />
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Chatbot;
