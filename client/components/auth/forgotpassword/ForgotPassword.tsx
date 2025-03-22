"use client";

import { useState } from "react";
import { auth } from "../../../src/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import {
    Box,
    Button,
    Input,
    Text,
    useToast,
    Heading,
    VStack,
    FormControl,
    FormLabel,
    Icon,
} from "@chakra-ui/react";
import { FiMail } from "react-icons/fi";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleResetPassword = async () => {
        if (!email) {
            toast({
                title: "Error",
                description: "Please enter your email.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            toast({
                title: "Email Sent",
                description: "Check your email for the password reset link.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
        setLoading(false);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minH="100vh"
            bg="gray.100"
        >
            <Box
                bg="white"
                p={8}
                boxShadow="md"
                borderRadius="lg"
                maxW="400px"
                w="full"
                textAlign="center"
            >
                <Icon as={FiMail} boxSize={12} color="blue.500" mb={4} />
                <Heading fontSize="2xl" mb={2}>
                    Forgot Password?
                </Heading>
                <Text fontSize="sm" color="gray.600" mb={4}>
                    Enter your email and we'll send you a reset link.
                </Text>
                <VStack spacing={4} align="stretch">
                    <FormControl>
                        <FormLabel>Email Address</FormLabel>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            bg="gray.50"
                            borderRadius="md"
                        />
                    </FormControl>
                    <Button
                        colorScheme="blue"
                        isLoading={loading}
                        onClick={handleResetPassword}
                        w="full"
                        borderRadius="md"
                    >
                        Send Reset Link
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
};

export default ForgotPassword;
