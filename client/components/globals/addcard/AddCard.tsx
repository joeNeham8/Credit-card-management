"use client";

import { useState, useEffect } from "react";
import {
    Box,
    Button,
    Input,
    useToast,
    FormControl,
    FormLabel,
    HStack,
    VStack,
    Heading,
    Icon,
    Select,
} from "@chakra-ui/react";
import { auth, db } from "../../../src/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FaCreditCard } from "react-icons/fa";

export default function AddCard() {
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [bank, setBank] = useState("");
    const [customBank, setCustomBank] = useState("");
    const [userId, setUserId] = useState("");
    const toast = useToast();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
                console.log("User ID set:", user.uid);
            }
        });

        return () => unsubscribe();
    }, []);

    function formatCardNumber(value) {
        return value
            .replace(/\D/g, "")
            .replace(/(.{4})/g, "$1 ")
            .trim()
            .substring(0, 19);
    }

    async function handleAddCard() {
        console.log("Submitting form...");

        if (!userId) {
            console.error("User ID is not available!");
            toast({
                title: "Error",
                description: "User not authenticated.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const selectedBank = bank === "Other" ? customBank : bank;

        if (!cardNumber || !expiryDate || !cvv || !selectedBank) {
            console.log("Form validation failed!");
            toast({
                title: "Error",
                description: "Please fill all fields.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const cardData = {
            cardNumber,
            expiryDate,
            cvv,
            bank: selectedBank,
        };

        console.log("Card Data Before Saving:", cardData);

        try {
            console.log("Adding card to Firestore...");
            await setDoc(
                doc(db, "users", userId, "cards", cardNumber),
                cardData
            );

            console.log("Card added successfully!");

            toast({
                title: "Success",
                description: "Card added successfully!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            setCardNumber("");
            setExpiryDate("");
            setCvv("");
            setBank("");
            setCustomBank("");
        } catch (error) {
            console.error("Error adding card: ", error);
            toast({
                title: "Error",
                description: "Failed to add card.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minH="100vh"
            bg="gray.100"
            p={4}
        >
            <Box
                p={6}
                maxW="500px"
                width="100%"
                borderWidth={1}
                borderRadius="lg"
                boxShadow="lg"
                bg="white"
            >
                <Heading size="lg" textAlign="center" mb={4}>
                    <Icon as={FaCreditCard} mr={2} />
                    Add New Card
                </Heading>

                <VStack spacing={4} align="stretch">
                    <FormControl>
                        <FormLabel>Bank Name</FormLabel>
                        <Select
                            placeholder="Select a Bank"
                            value={bank}
                            onChange={(e) => setBank(e.target.value)}
                        >
                            <option value="State Bank of India">
                                State Bank of India
                            </option>
                            <option value="Union Bank of India">
                                Union Bank of India
                            </option>
                            <option value="HDFC Bank">HDFC Bank</option>
                            <option value="ICICI Bank">ICICI Bank</option>
                            <option value="Axis Bank">Axis Bank</option>
                            <option value="Punjab National Bank">
                                Punjab National Bank
                            </option>
                            <option value="Kotak Mahindra Bank">
                                Kotak Mahindra Bank
                            </option>
                            <option value="Other">Other</option>
                        </Select>
                    </FormControl>

                    {bank === "Other" && (
                        <FormControl>
                            <FormLabel>Enter Bank Name</FormLabel>
                            <Input
                                placeholder="Enter bank name"
                                value={customBank}
                                onChange={(e) => setCustomBank(e.target.value)}
                            />
                        </FormControl>
                    )}

                    <FormControl>
                        <FormLabel>Card Number</FormLabel>
                        <Input
                            placeholder="1234 5678 9101 1121"
                            value={cardNumber}
                            onChange={(e) =>
                                setCardNumber(formatCardNumber(e.target.value))
                            }
                        />
                    </FormControl>

                    <HStack spacing={4} align="stretch">
                        <FormControl>
                            <FormLabel>Expiry Date</FormLabel>
                            <Input
                                placeholder="MM/YY"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>CVV</FormLabel>
                            <Input
                                placeholder="123"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                type="password"
                            />
                        </FormControl>
                    </HStack>

                    <Button colorScheme="blue" onClick={handleAddCard} width="full">
                        Add Card
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
}
