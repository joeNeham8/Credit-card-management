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
import axios from "axios";
import { auth } from "../../../src/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { FaCreditCard } from "react-icons/fa";

// function handleCardNumberChange(input: string) {
//     // Remove all non-digit characters
//     let formatted = input.replace(/\D/g, "");

//     // Limit to 16 digits
//     formatted = formatted.slice(0, 16);

//     // Add spaces after every 4 digits
//     formatted = formatted.replace(/(\d{4})/g, "$1 ").trim();

//     setCardNumber(formatted);
// }

export default function AddCard() {
    const [cardNumber, setCardNumber] = useState("");
    const [cardHolder, setCardHolder] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [bank, setBank] = useState("");
    const [customBank, setCustomBank] = useState("");
    const [userId, setUserId] = useState("");
    const toast = useToast();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) setUserId(user.uid);
        });

        return () => unsubscribe();
    }, []);

    async function handleAddCard() {
        const selectedBank = bank === "Other" ? customBank : bank;

        if (
            !cardNumber ||
            !cardHolder ||
            !expiryDate ||
            !cvv ||
            !selectedBank
        ) {
            toast({
                title: "Error",
                description: "Please fill all fields.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/add-card", {
                uid: userId,
                cardNumber,
                cardHolder,
                expiryDate,
                cvv,
                bank: selectedBank,
            });

            toast({
                title: "Success",
                description: "Card added successfully!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            setCardNumber("");
            setCardHolder("");
            setExpiryDate("");
            setCvv("");
            setBank("");
            setCustomBank("");
        } catch {
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
                maxW="800px"
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

                <HStack spacing={6} align="start">
                    {/* Left Column */}
                    <VStack spacing={4} flex={1} align="stretch">
                        <FormControl>
                            <FormLabel>Card Number</FormLabel>
                            <Input
                                placeholder="1234 5678 9101 1121"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Card Holder Name</FormLabel>
                            <Input
                                placeholder="John Doe"
                                value={cardHolder}
                                onChange={(e) => setCardHolder(e.target.value)}
                            />
                        </FormControl>

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
                                <option value="State Bank of India">
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
                                    onChange={(e) =>
                                        setCustomBank(e.target.value)
                                    }
                                />
                            </FormControl>
                        )}
                    </VStack>

                    {/* Right Column */}
                    <VStack spacing={4} flex={1} align="stretch">
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

                        <Button
                            colorScheme="blue"
                            onClick={handleAddCard}
                            width="full"
                            mt={4}
                        >
                            Add Card
                        </Button>
                    </VStack>
                </HStack>
            </Box>
        </Box>
    );
}
