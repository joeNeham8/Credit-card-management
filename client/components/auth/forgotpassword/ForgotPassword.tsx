"use client";

import { useState } from "react";
import { auth } from "../../../src/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { Box, Button, Input, Text, useToast } from "@chakra-ui/react";

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
        <Box p={6} maxW="400px" mx="auto">
            <Text fontSize="xl" fontWeight="bold" mb={4}>
                Forgot Password
            </Text>
            <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                mb={3}
            />
            <Button
                colorScheme="blue"
                isLoading={loading}
                onClick={handleResetPassword}
                width="full"
            >
                Reset Password
            </Button>
        </Box>
    );
};

export default ForgotPassword;
