        const materialsSection = document.getElementById('materialsSection');
        const timetableSection = document.getElementById('timetableSection');
        const timetableDisplay = document.getElementById('timetableDisplay');
        const loginModal = document.getElementById('loginModal');
        const userInfo = document.getElementById('userInfo');
        const chatbotContainer = document.getElementById('chatbotContainer');
        
        let materialsVisible = false;
        let timetableVisible = false;
        let isLoggedIn = false;
        let currentUser = null;

        // User database (in real app, this would be server-side)
        const users = {
            "612507153": { password: "suyash123", name: "SUYASH ANIL JORE" },
            "612507107": { password: "rishi123", name: "RISHI PANKAJ GUJARATHI" },
            "612507148": { password: "soumya123", name: "SOUMYA SANJAY FUSEY" },
            "612507170": { password: "vishwajeet123", name: "VISHWAJEET MOHITE" },
            "612507113": { password: "rohan123", name: "ROHAN VINAYAK VAIDYA" },
            "612507121": { password: "samarth123", name: "SAMARTH SUNIL KADAM" }
        };

        // Login Functions
        function showLogin() {
            if (isLoggedIn) {
                alert('You are already logged in!');
                return;
            }
            loginModal.style.display = 'flex';
        }

        function closeLogin() {
            loginModal.style.display = 'none';
            document.getElementById('loginMIS').value = '';
            document.getElementById('loginPassword').value = '';
        }

        function handleLogin(event) {
            event.preventDefault();
            const mis = document.getElementById('loginMIS').value;
            const password = document.getElementById('loginPassword').value;

            if (users[mis] && users[mis].password === password) {
                isLoggedIn = true;
                currentUser = { mis: mis, name: users[mis].name };
                
                document.getElementById('userName').textContent = `Welcome, ${users[mis].name.split(' ')[0]}!`;
                userInfo.style.display = 'block';
                closeLogin();
            } else {
                alert('Invalid MIS or Password!');
            }
        }

        function logout() {
            isLoggedIn = false;
            currentUser = null;
            userInfo.style.display = 'none';
            alert('Logged out successfully!');
        }

        // Chatbot Functions
        function toggleChatbot() {
            if (chatbotContainer.style.display === 'flex') {
                chatbotContainer.style.display = 'none';
            } else {
                chatbotContainer.style.display = 'flex';
            }
        }

        function handleChatKeyPress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }

        function sendMessage() {
            const input = document.getElementById('chatbotInput');
            const message = input.value.trim();
            
            if (!message) return;

            // Add user message
            addChatMessage(message, 'user');
            input.value = '';

            // Generate bot response
            setTimeout(() => {
                const response = generateBotResponse(message);
                addChatMessage(response, 'bot');
            }, 500);
        }

        function addChatMessage(text, sender) {
            const messagesContainer = document.getElementById('chatbotMessages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `chatbot-message ${sender}`;
            messageDiv.textContent = text;
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function generateBotResponse(message) {
            const lowerMessage = message.toLowerCase();

            if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
                return 'Hello! How can I assist you with ENTC materials or timetables today?';
            } else if (lowerMessage.includes('timetable')) {
                return 'To view your timetable, click on "MIS-Wise Timetable" and enter your MIS number!';
            } else if (lowerMessage.includes('material') || lowerMessage.includes('notes')) {
                return 'Click on "Materials" to browse all subject materials including books, notes, and papers!';
            } else if (lowerMessage.includes('subject')) {
                return 'We have materials for: DSP, Communication Systems, Microprocessors, EM Waves, VLSI Design, and Antenna & Wave Propagation!';
            } else if (lowerMessage.includes('login')) {
                return 'Click the "Login" button to access your personalized dashboard with your MIS credentials!';
            } else if (lowerMessage.includes('help')) {
                return 'I can help you with:\n- Viewing timetables\n- Accessing study materials\n- Subject information\n- Login assistance\nJust ask me anything!';
            } else {
                return 'I\'m here to help! Ask me about timetables, materials, subjects, or login. Type "help" for more options.';
            }
        }

        // Complete timetable database based on your MIS data
        const timetableDatabase = {
            "612507153": {
                name: "SUYASH ANIL JORE",
                branch: "Electronics and Telecommunication Engineering",
                division: "Division 2",
                schedule: [
                    {
                        time: "08:30 - 09:30",
                        monday: { subject: "LAB Batch 4-FCS-Fundamentals of Cyber Security", room: "CCF-2 Cognizant LAB AC", division: "Division 2" },
                        tuesday: "",
                        wednesday: "",
                        thursday: "",
                        friday: { subject: "LAB Batch 3-EEE-Elements of Electronics Engg", room: "POWER LAB", division: "Division 2" },
                        saturday: ""
                    },
                    {
                        time: "09:30 - 10:30",
                        monday: { subject: "LAB Batch 4-FCS-Fundamentals of Cyber Security", room: "CCF-2 Cognizant LAB AC", division: "Division 2" },
                        tuesday: "",
                        wednesday: "",
                        thursday: "",
                        friday: { subject: "LAB Batch 3-EEE-Elements of Electronics Engg", room: "POWER LAB", division: "Division 2" },
                        saturday: ""
                    },
                    {
                        time: "10:30 - 11:30",
                        monday: { subject: "EEE- Elements of Electronics Engg", room: "NC11", division: "Division 2" },
                        tuesday: { subject: "AIMA- AI for Multi. Application", room: "NC08", division: "Division 3" },
                        wednesday: { subject: "MAC", room: "NC08", division: "Division 9" },
                        thursday: "",
                        friday: { subject: "Tut Batch 2-MAC", room: "NC08", division: "Division 9" },
                        saturday: ""
                    },
                    {
                        time: "11:30 - 12:30",
                        monday: { subject: "Engg Physics", room: "NC04", division: "Division 8" },
                        tuesday: { subject: "EEE- Elements of Electronics Engg", room: "NC11", division: "Division 2" },
                        wednesday: { subject: "Engg Physics", room: "NC04", division: "Division 8" },
                        thursday: "",
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "12:30 - 01:30",
                        monday: "",
                        tuesday: "",
                        wednesday: "",
                        thursday: "",
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "01:30 - 02:30",
                        monday: { subject: "LAB Batch 1-Engg Physics", room: "Physics LAB", division: "Division 8" },
                        tuesday: { subject: "FCS- Fundamentals of Cyber Security", room: "NC09", division: "Division 2" },
                        wednesday: { subject: "FCS- Fundamentals of Cyber Security", room: "NC09", division: "Division 2" },
                        thursday: "",
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "02:30 - 03:30",
                        monday: { subject: "LAB Batch 1-Engg Physics", room: "Physics LAB", division: "Division 8" },
                        tuesday: { subject: "MAC", room: "NC08", division: "Division 9" },
                        wednesday: { subject: "Electromagnetism", room: "NC02", division: "Division 3" },
                        thursday: "",
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "03:30 - 04:30",
                        monday: "",
                        tuesday: "",
                        wednesday: { subject: "LAB Batch 4-EMS- Electrical Maintainance and Safety", room: "Power System LAB", division: "Division 1" },
                        thursday: { subject: "E&TC 20-CS-Communication Skills Dr. Meghna Mane", room: "Lang Lab", division: "Division 8" },
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "04:30 - 05:30",
                        monday: "",
                        tuesday: "",
                        wednesday: { subject: "LAB Batch 4-EMS- Electrical Maintainance and Safety", room: "Power System LAB", division: "Division 1" },
                        thursday: { subject: "E&TC 20-CS-Communication Skills Dr. Meghna Mane", room: "Lang Lab", division: "Division 8" },
                        friday: { subject: "AIMA- AI for Multi. Application", room: "NC08", division: "Division 3" },
                        saturday: ""
                    },
                    {
                        time: "05:30 - 06:30",
                        monday: { subject: "AIMA- AI for Multi. Application", room: "NC10", division: "Division 3" },
                        tuesday: "",
                        wednesday: { subject: "Electromagnetism", room: "NC02", division: "Division 3" },
                        thursday: { subject: "EMS- Electrical Maintainance and Safety", room: "NC11", division: "Division 1" },
                        friday: "",
                        saturday: ""
                    }
                ]
            },
            "612507107": {
                name: "RISHI PANKAJ GUJARATHI",
                branch: "Electronics and Telecommunication Engineering",
                division: "Division 2",
                schedule: [
                    {
                        time: "08:30 - 09:30",
                        monday: { subject: "LAB Batch 5-FCS-Fundamentals of Cyber Security", room: "CCF-3 Cognizant LAB AC", division: "Division 2" },
                        tuesday: "",
                        wednesday: "",
                        thursday: "",
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "09:30 - 10:30",
                        monday: { subject: "LAB Batch 5-FCS-Fundamentals of Cyber Security", room: "CCF-3 Cognizant LAB AC", division: "Division 2" },
                        tuesday: "",
                        wednesday: "",
                        thursday: "",
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "10:30 - 11:30",
                        monday: { subject: "EEE- Elements of Electronics Engg", room: "NC11", division: "Division 2" },
                        tuesday: { subject: "AIMA- AI for Multi. Application", room: "NC08", division: "Division 3" },
                        wednesday: { subject: "MAC", room: "NC03", division: "Division 7" },
                        thursday: { subject: "LAB Batch 2-PP- Python Programming", room: "Graphics LAB CSE Ground Floor", division: "Division 3" },
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "11:30 - 12:30",
                        monday: { subject: "Engg Physics", room: "NC03", division: "Division 7" },
                        tuesday: { subject: "EEE- Elements of Electronics Engg", room: "NC11", division: "Division 2" },
                        wednesday: { subject: "Engg Physics", room: "NC03", division: "Division 7" },
                        thursday: { subject: "LAB Batch 2-PP- Python Programming", room: "Graphics LAB CSE Ground Floor", division: "Division 3" },
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "12:30 - 01:30",
                        monday: "",
                        tuesday: "",
                        wednesday: "",
                        thursday: "",
                        friday: "",
                        saturday: { subject: "Tut Batch 3-MAC", room: "NC03", division: "Division 7" }
                    },
                    {
                        time: "01:30 - 02:30",
                        monday: { subject: "LAB Batch 1-Engg Physics", room: "Physics LAB", division: "Division 7" },
                        tuesday: { subject: "FCS- Fundamentals of Cyber Security", room: "NC09", division: "Division 2" },
                        wednesday: { subject: "FCS- Fundamentals of Cyber Security", room: "NC09", division: "Division 2" },
                        thursday: { subject: "LAB Batch 1-EEE- Elements of Electronics Engg", room: "POWER LAB", division: "Division 2" },
                        friday: "",
                        saturday: { subject: "Tut Batch 3-MAC", room: "NC03", division: "Division 7" }
                    },
                    {
                        time: "02:30 - 03:30",
                        monday: { subject: "LAB Batch 1-Engg Physics", room: "Physics LAB", division: "Division 7" },
                        tuesday: { subject: "MAC", room: "NC03", division: "Division 7" },
                        wednesday: { subject: "Fundamentals Of Quantum Physics", room: "NC09", division: "Division 4" },
                        thursday: { subject: "LAB Batch 1-EEE- Elements of Electronics Engg", room: "POWER LAB", division: "Division 2" },
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "03:30 - 04:30",
                        monday: "",
                        tuesday: "",
                        wednesday: "",
                        thursday: { subject: "E&TC 19-CS-Communication Skills Dr. Avinash K", room: "NC14", division: "Division 7" },
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "04:30 - 05:30",
                        monday: "",
                        tuesday: "",
                        wednesday: "",
                        thursday: { subject: "E&TC 19-CS-Communication Skills Dr. Avinash K", room: "NC14", division: "Division 7" },
                        friday: { subject: "AIMA- AI for Multi. Application", room: "NC08", division: "Division 3" },
                        saturday: ""
                    },
                    {
                        time: "05:30 - 06:30",
                        monday: { subject: "AIMA- AI for Multi. Application", room: "NC10", division: "Division 3" },
                        tuesday: "",
                        wednesday: { subject: "Fundamentals Of Quantum Physics", room: "NC09", division: "Division 4" },
                        thursday: { subject: "PP- Python Programming", room: "NC08", division: "Division 3" },
                        friday: "",
                        saturday: ""
                    }
                ]
            },
            "612507148": {
                name: "SOUMYA SANJAY FUSEY",
                branch: "Electronics and Telecommunication Engineering",
                division: "Division 2",
                schedule: [
                    {
                        time: "08:30 - 09:30",
                        monday: { subject: "LAB Batch 4-FCS-Fundamentals of Cyber Security", room: "CCF-2 Cognizant LAB AC", division: "Division 2" },
                        tuesday: "",
                        wednesday: "",
                        thursday: "",
                        friday: { subject: "LAB Batch 3-EEE-Elements of Electronics Engg", room: "POWER LAB", division: "Division 2" },
                        saturday: ""
                    },
                    {
                        time: "09:30 - 10:30",
                        monday: { subject: "LAB Batch 4-FCS-Fundamentals of Cyber Security", room: "CCF-2 Cognizant LAB AC", division: "Division 2" },
                        tuesday: "",
                        wednesday: "",
                        thursday: "",
                        friday: { subject: "LAB Batch 3-EEE-Elements of Electronics Engg", room: "POWER LAB", division: "Division 2" },
                        saturday: ""
                    },
                    {
                        time: "10:30 - 11:30",
                        monday: { subject: "EEE- Elements of Electronics Engg", room: "NC11", division: "Division 2" },
                        tuesday: { subject: "AIMA- AI for Multi. Application", room: "NC08", division: "Division 3" },
                        wednesday: { subject: "MAC", room: "NC04", division: "Division 8" },
                        thursday: "",
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "11:30 - 12:30",
                        monday: { subject: "Engg Physics", room: "NC04", division: "Division 8" },
                        tuesday: { subject: "EEE- Elements of Electronics Engg", room: "NC11", division: "Division 2" },
                        wednesday: { subject: "Engg Physics", room: "NC04", division: "Division 8" },
                        thursday: "",
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "12:30 - 01:30",
                        monday: "",
                        tuesday: "",
                        wednesday: "",
                        thursday: "",
                        friday: "",
                        saturday: { subject: "Tut Batch 3-MAC", room: "NC04", division: "Division 8" }
                    },
                    {
                        time: "01:30 - 02:30",
                        monday: { subject: "LAB Batch 1-Engg Physics", room: "Physics LAB", division: "Division 8" },
                        tuesday: { subject: "FCS- Fundamentals of Cyber Security", room: "NC09", division: "Division 2" },
                        wednesday: { subject: "FCS- Fundamentals of Cyber Security", room: "NC09", division: "Division 2" },
                        thursday: "",
                        friday: "",
                        saturday: { subject: "Tut Batch 3-MAC", room: "NC04", division: "Division 8" }
                    },
                    {
                        time: "02:30 - 03:30",
                        monday: { subject: "LAB Batch 1-Engg Physics", room: "Physics LAB", division: "Division 8" },
                        tuesday: { subject: "MAC", room: "NC04", division: "Division 8" },
                        wednesday: { subject: "Nanomaterials", room: "NC12", division: "Division 2" },
                        thursday: "",
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "03:30 - 04:30",
                        monday: { subject: "LAB Batch 1-PP- Python Programming", room: "FOSS-1 Free&Open Source Software LAB E&TC Extansion 3rd Floor", division: "Division 3" },
                        tuesday: "",
                        wednesday: "",
                        thursday: { subject: "E&TC 20-CS-Communication Skills Dr. Meghna Mane", room: "Lang Lab", division: "Division 8" },
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "04:30 - 05:30",
                        monday: { subject: "LAB Batch 1-PP- Python Programming", room: "FOSS-1 Free&Open Source Software LAB E&TC Extansion 3rd Floor", division: "Division 3" },
                        tuesday: "",
                        wednesday: "",
                        thursday: { subject: "E&TC 20-CS-Communication Skills Dr. Meghna Mane", room: "Lang Lab", division: "Division 8" },
                        friday: { subject: "AIMA- AI for Multi. Application", room: "NC08", division: "Division 3" },
                        saturday: ""
                    },
                    {
                        time: "05:30 - 06:30",
                        monday: { subject: "AIMA- AI for Multi. Application", room: "NC10", division: "Division 3" },
                        tuesday: "",
                        wednesday: { subject: "Nanomaterials", room: "NC12", division: "Division 2" },
                        thursday: { subject: "PP- Python Programming", room: "NC08", division: "Division 3" },
                        friday: "",
                        saturday: ""
                    }
                ]
            },
            "612507170": {
                name: "VISHWAJEET MOHITE",
                branch: "Electronics and Telecommunication Engineering",
                division: "Division 2",
                schedule: [
                    {
                        time: "08:30 - 09:30",
                        monday: { subject: "LAB Batch 6-FCS-Fundamentals of Cyber Security", room: "CCF-4 Cognizant LAB AC", division: "Division 2" },
                        tuesday: "",
                        wednesday: "",
                        thursday: "",
                        friday: { subject: "LAB Batch 4-EEE-Elements of Electronics Engg", room: "ECW LAB", division: "Division 2" },
                        saturday: ""
                    },
                    {
                        time: "09:30 - 10:30",
                        monday: { subject: "LAB Batch 6-FCS-Fundamentals of Cyber Security", room: "CCF-4 Cognizant LAB AC", division: "Division 2" },
                        tuesday: "",
                        wednesday: "",
                        thursday: "",
                        friday: { subject: "LAB Batch 4-EEE-Elements of Electronics Engg", room: "ECW LAB", division: "Division 2" },
                        saturday: ""
                    },
                    {
                        time: "10:30 - 11:30",
                        monday: { subject: "EEE- Elements of Electronics Engg", room: "NC11", division: "Division 2" },
                        tuesday: { subject: "AIMA- AI for Multi. Application", room: "NC08", division: "Division 3" },
                        wednesday: { subject: "MAC", room: "NC08", division: "Division 9" },
                        thursday: { subject: "LAB Batch 2-MPFL-Manufacturing Practices and Fab Lab", room: "WORKSHOP", division: "Division 1" },
                        friday: { subject: "Tut Batch 2-MAC", room: "NC08", division: "Division 9" },
                        saturday: { subject: "PD- Personality Development(1st&3rd Sat-11am/ 2nd&4th Sat- 10:45am)", room: "AC102", division: "Division 6" }
                    },
                    {
                        time: "11:30 - 12:30",
                        monday: { subject: "Engg Physics", room: "NC04", division: "Division 8" },
                        tuesday: { subject: "EEE- Elements of Electronics Engg", room: "NC11", division: "Division 2" },
                        wednesday: { subject: "Engg Physics", room: "NC04", division: "Division 8" },
                        thursday: { subject: "LAB Batch 2-MPFL-Manufacturing Practices and Fab Lab", room: "WORKSHOP", division: "Division 1" },
                        friday: "",
                        saturday: { subject: "PD- Personality Development(1st&3rd Sat-11am/ 2nd&4th Sat- 10:45am)", room: "AC102", division: "Division 6" }
                    },
                    {
                        time: "12:30 - 01:30",
                        monday: "",
                        tuesday: "",
                        wednesday: "",
                        thursday: "",
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "01:30 - 02:30",
                        monday: { subject: "LAB Batch 1-Engg Physics", room: "Physics LAB", division: "Division 8" },
                        tuesday: { subject: "FCS-Fundamentals of Cyber Security", room: "NC09", division: "Division 2" },
                        wednesday: { subject: "FCS-Fundamentals of Cyber Security", room: "NC09", division: "Division 2" },
                        thursday: "",
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "02:30 - 03:30",
                        monday: { subject: "LAB Batch 1-Engg Physics", room: "Physics LAB", division: "Division 8" },
                        tuesday: { subject: "MAC", room: "NC08", division: "Division 9" },
                        wednesday: { subject: "Emerging Tech in Energy Storage", room: "NC11", division: "Division 2" },
                        thursday: "",
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "03:30 - 04:30",
                        monday: "",
                        tuesday: "",
                        wednesday: "",
                        thursday: "",
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "04:30 - 05:30",
                        monday: "",
                        tuesday: "",
                        wednesday: "",
                        thursday: "",
                        friday: { subject: "AIMA- AI for Multi. Application", room: "NC08", division: "Division 3" },
                        saturday: ""
                    },
                    {
                        time: "05:30 - 06:30",
                        monday: { subject: "AIMA- AI for Multi. Application", room: "NC10", division: "Division 3" },
                        tuesday: "",
                        wednesday: { subject: "Emerging Tech in Energy Storage", room: "NC11", division: "Division 2" },
                        thursday: { subject: "MPFL- Manufacturing Practices and Fab Lab", room: "NC14", division: "Division 1" },
                        friday: "",
                        saturday: ""
                    }
                ]
            },
            "612507113": {
                name: "ROHAN VINAYAK VAIDYA",
                branch: "Electronics and Telecommunication Engineering",
                division: "Division 2",
                schedule: [
                    {
                        time: "08:30 - 09:30",
                        monday: { subject: "LAB Batch 6-FCS-Fundamentals of Cyber Security", room: "CCF-4 Cognizant LAB AC", division: "Division 2" },
                        tuesday: "",
                        wednesday: "",
                        thursday: "",
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "09:30 - 10:30",
                        monday: { subject: "LAB Batch 6-FCS-Fundamentals of Cyber Security", room: "CCF-4 Cognizant LAB AC", division: "Division 2" },
                        tuesday: "",
                        wednesday: "",
                        thursday: "",
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "10:30 - 11:30",
                        monday: { subject: "EEE- Elements of Electronics Engg", room: "NC11", division: "Division 2" },
                        tuesday: { subject: "AIMA- AI for Multi. Application", room: "NC08", division: "Division 3" },
                        wednesday: { subject: "MAC", room: "NC04", division: "Division 8" },
                        thursday: "",
                        friday: { subject: "Tut Batch 2-MAC", room: "NC04", division: "Division 8" },
                        saturday: { subject: "PD- Personality Development(1st&3rd Sat- 11am/ 2nd&4th Sat- 10:45am)", room: "AC101", division: "Division 5" }
                    },
                    {
                        time: "11:30 - 12:30",
                        monday: { subject: "Engg Physics", room: "NC03", division: "Division 7" },
                        tuesday: { subject: "EEE- Elements of Electronics Engg", room: "NC11", division: "Division 2" },
                        wednesday: { subject: "Engg Physics", room: "NC03", division: "Division 7" },
                        thursday: "",
                        friday: "",
                        saturday: { subject: "PD- Personality Development(1st&3rd Sat- 11am/ 2nd&4th Sat- 10:45am)", room: "AC101", division: "Division 5" }
                    },
                    {
                        time: "12:30 - 01:30",
                        monday: "",
                        tuesday: "",
                        wednesday: "",
                        thursday: "",
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "01:30 - 02:30",
                        monday: { subject: "LAB Batch 1-Engg Physics", room: "Physics LAB", division: "Division 7" },
                        tuesday: { subject: "FCS- Fundamentals of Cyber Security", room: "NC09", division: "Division 2" },
                        wednesday: { subject: "FCS- Fundamentals of Cyber Security", room: "NC09", division: "Division 2" },
                        thursday: { subject: "LAB Batch 1-EEE-Elements of Electronics Engg", room: "POWER LAB", division: "Division 2" },
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "02:30 - 03:30",
                        monday: { subject: "LAB Batch 1-Engg Physics", room: "Physics LAB", division: "Division 7" },
                        tuesday: { subject: "MAC", room: "NC04", division: "Division 8" },
                        wednesday: { subject: "Emerging Tech in Energy Storage", room: "NC11", division: "Division 2" },
                        thursday: { subject: "LAB Batch 1-EEE-Elements of Electronics Engg", room: "POWER LAB", division: "Division 2" },
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "03:30 - 04:30",
                        monday: "",
                        tuesday: "",
                        wednesday: "",
                        thursday: { subject: "LAB Batch 1-MPFL-Manufacturing Practices and Fab Lab", room: "WORKSHOP", division: "Division 1" },
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "04:30 - 05:30",
                        monday: "",
                        tuesday: "",
                        wednesday: "",
                        thursday: { subject: "LAB Batch 1-MPFL-Manufacturing Practices and Fab Lab", room: "WORKSHOP", division: "Division 1" },
                        friday: { subject: "AIMA- AI for Multi. Application", room: "NC08", division: "Division 3" },
                        saturday: ""
                    },
                    {
                        time: "05:30 - 06:30",
                        monday: { subject: "AIMA- AI for Multi. Application", room: "NC10", division: "Division 3" },
                        tuesday: "",
                        wednesday: { subject: "Emerging Tech in Energy Storage", room: "NC11", division: "Division 2" },
                        thursday: { subject: "MPFL- Manufacturing Practices and Fab Lab", room: "NC14", division: "Division 1" },
                        friday: "",
                        saturday: ""
                    }
                ]
            },
            "612507121": {
                name: "SAMARTH SUNIL KADAM",
                branch: "Electronics and Telecommunication Engineering",
                division: "Division 2",
                schedule: [
                    {
                        time: "08:30 - 09:30",
                        monday: "",
                        tuesday: "",
                        wednesday: "",
                        thursday: { subject: "LAB Batch 1-FCS-Fundamentals of Cyber Security", room: "CCF-1 Cognizant LAB AC", division: "Division 2" },
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "09:30 - 10:30",
                        monday: "",
                        tuesday: "",
                        wednesday: "",
                        thursday: { subject: "LAB Batch 1-FCS-Fundamentals of Cyber Security", room: "CCF-1 Cognizant LAB AC", division: "Division 2" },
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "10:30 - 11:30",
                        monday: { subject: "EEE- Elements of Electronics Engg", room: "NC11", division: "Division 2" },
                        tuesday: { subject: "AIMA- AI for Multi. Application", room: "NC08", division: "Division 3" },
                        wednesday: { subject: "MAC", room: "NC04", division: "Division 8" },
                        thursday: "",
                        friday: { subject: "Tut Batch 2-MAC", room: "NC04", division: "Division 8" },
                        saturday: ""
                    },
                    {
                        time: "11:30 - 12:30",
                        monday: { subject: "Engg Physics", room: "NC03", division: "Division 7" },
                        tuesday: { subject: "EEE- Elements of Electronics Engg", room: "NC11", division: "Division 2" },
                        wednesday: { subject: "Engg Physics", room: "NC03", division: "Division 7" },
                        thursday: "",
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "12:30 - 01:30",
                        monday: "",
                        tuesday: "",
                        wednesday: "",
                        thursday: "",
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "01:30 - 02:30",
                        monday: { subject: "LAB Batch 1-Engg Physics", room: "Physics LAB", division: "Division 7" },
                        tuesday: { subject: "FCS- Fundamentals of Cyber Security", room: "NC09", division: "Division 2" },
                        wednesday: { subject: "FCS- Fundamentals of Cyber Security", room: "NC09", division: "Division 2" },
                        thursday: { subject: "LAB Batch 1-EEE- Elements of Electronics Engg", room: "POWER LAB", division: "Division 2" },
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "02:30 - 03:30",
                        monday: { subject: "LAB Batch 1-Engg Physics", room: "Physics LAB", division: "Division 7" },
                        tuesday: { subject: "MAC", room: "NC04", division: "Division 8" },
                        wednesday: { subject: "Electromagnetism", room: "NC02", division: "Division 3" },
                        thursday: { subject: "LAB Batch 1-EEE- Elements of Electronics Engg", room: "POWER LAB", division: "Division 2" },
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "03:30 - 04:30",
                        monday: "",
                        tuesday: { subject: "LAB Batch 4-PP- Python Programming", room: "Graphics LAB CSE Ground Floor", division: "Division 3" },
                        wednesday: "",
                        thursday: { subject: "E&TC 19-CS- Communication Skills Dr. Avinash K", room: "NC14", division: "Division 7" },
                        friday: "",
                        saturday: ""
                    },
                    {
                        time: "04:30 - 05:30",
                        monday: "",
                        tuesday: { subject: "LAB Batch 4-PP- Python Programming", room: "Graphics LAB CSE Ground Floor", division: "Division 3" },
                        wednesday: "",
                        thursday: { subject: "E&TC 19-CS- Communication Skills Dr. Avinash K", room: "NC14", division: "Division 7" },
                        friday: { subject: "AIMA- AI for Multi. Application", room: "NC08", division: "Division 3" },
                        saturday: ""
                    },
                    {
                        time: "05:30 - 06:30",
                        monday: { subject: "AIMA- AI for Multi. Application", room: "NC10", division: "Division 3" },
                        tuesday: "",
                        wednesday: { subject: "Electromagnetism", room: "NC02", division: "Division 3" },
                        thursday: { subject: "PP- Python Programming", room: "NC08", division: "Division 3" },
                        friday: "",
                        saturday: ""
                    }
                ]
            }
        };

        function showMaterials() {
            materialsVisible = !materialsVisible;
            timetableVisible = false;
            timetableSection.style.display = 'none';
            timetableSection.style.opacity = '0';
            timetableDisplay.style.display = 'none';
            timetableDisplay.style.opacity = '0';
            
            if (materialsVisible) {
                materialsSection.style.display = 'grid';
                setTimeout(() => {
                    materialsSection.style.opacity = '1';
                }, 10);
            } else {
                materialsSection.style.opacity = '0';
                setTimeout(() => {
                    materialsSection.style.display = 'none';
                }, 300);
            }
        }

        function showMidSemHistory() {
            timetableVisible = !timetableVisible;
            materialsVisible = false;
            materialsSection.style.display = 'none';
            materialsSection.style.opacity = '0';
            timetableDisplay.style.display = 'none';
            timetableDisplay.style.opacity = '0';
            
            if (timetableVisible) {
                timetableSection.style.display = 'block';
                setTimeout(() => {
                    timetableSection.style.opacity = '1';
                }, 10);
            } else {
                timetableSection.style.opacity = '0';
                setTimeout(() => {
                    timetableSection.style.display = 'none';
                }, 300);
            }
        }

        function getTimetable() {
            const mis = document.getElementById('mis').value;

            if (!mis) {
                alert('Please enter your MIS number');
                return;
            }

            // Check if timetable exists for this MIS
            if (timetableDatabase[mis]) {
                displayTimetable(mis);
            } else {
                alert('No timetable found for MIS: ' + mis + '\n\nCurrently available timetables:\n- 612507153 (SUYASH ANIL JORE)\n- 612507107 (RISHI PANKAJ GUJARATHI)');
            }
        }

        function displayTimetable(mis) {
            const data = timetableDatabase[mis];
            
            // Update student info
            document.getElementById('studentName').textContent = data.name;
            document.getElementById('displayMIS').textContent = mis;
            document.getElementById('displayDivision').textContent = data.branch;

            // Generate timetable rows
            const tbody = document.getElementById('timetableBody');
            tbody.innerHTML = '';

            data.schedule.forEach(slot => {
                const row = document.createElement('tr');
                
                // Time column
                const timeCell = document.createElement('td');
                timeCell.textContent = slot.time;
                row.appendChild(timeCell);

                // Day columns
                ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].forEach(day => {
                    const cell = document.createElement('td');
                    
                    if (slot[day] && slot[day].subject) {
                        const classInfo = document.createElement('div');
                        classInfo.className = 'class-info';
                        
                        const title = document.createElement('div');
                        title.className = 'class-title';
                        title.textContent = slot[day].subject;
                        
                        const room = document.createElement('div');
                        room.className = 'class-details class-room';
                        room.textContent = `Room: ${slot[day].room}`;
                        
                        const division = document.createElement('div');
                        division.className = 'class-details class-division';
                        division.textContent = `Division: ${slot[day].division}`;
                        
                        classInfo.appendChild(title);
                        classInfo.appendChild(room);
                        classInfo.appendChild(division);
                        cell.appendChild(classInfo);
                    }
                    
                    row.appendChild(cell);
                });
                
                tbody.appendChild(row);
            });

            // Hide form and show timetable
            timetableSection.style.opacity = '0';
            setTimeout(() => {
                timetableSection.style.display = 'none';
                timetableDisplay.style.display = 'block';
                setTimeout(() => {
                    timetableDisplay.style.opacity = '1';
                }, 10);
            }, 300);
        }

        function backToForm() {
            timetableDisplay.style.opacity = '0';
            setTimeout(() => {
                timetableDisplay.style.display = 'none';
                timetableSection.style.display = 'block';
                setTimeout(() => {
                    timetableSection.style.opacity = '1';
                }, 10);
            }, 300);
        }

        // Add input validation for MIS number
        document.getElementById('mis').addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '');
        });