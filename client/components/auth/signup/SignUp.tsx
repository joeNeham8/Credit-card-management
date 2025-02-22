"use client";

import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Heading,
    Text,
    useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Import Firebase Auth
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../../../src/firebaseConfig"; // Import Firebase config

export default function SignUp() {
    const router = useRouter();
    const toast = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // Initialize Firebase Auth
    const auth = getAuth(firebaseApp);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!email || !password || !confirmPassword) {
            toast({
                title: "Please fill all the fields.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (password !== confirmPassword) {
            toast({
                title: "Passwords do not match.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setLoading(true);

        // Firebase Signup
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setLoading(false);
                console.log("Signup Success:", userCredential);

                toast({
                    title: "Account created successfully.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });

                setTimeout(() => {
                    router.push("/auth/login");
                }, 2000);
            })
            .catch((error) => {
                setLoading(false);
                console.error("Firebase Signup Error:", error);

                let message =
                    error.message || "An error occurred. Please try again.";

                // Handle common Firebase auth errors
                if (error.code === "auth/email-already-in-use") {
                    message = "This email is already in use.";
                } else if (error.code === "auth/weak-password") {
                    message = "Password should be at least 6 characters.";
                } else if (error.code === "auth/invalid-email") {
                    message = "Invalid email format.";
                }

                toast({
                    title: message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            });
    }

    return (
        <Box
            minH="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Box
                w="full"
                maxW="400px"
                p={6}
                borderWidth={1}
                borderRadius="lg"
                boxShadow="lg"
                bg={"var(--form-color)"}
                fontFamily={"var(--font-primary)"}
            >
                <Heading mb={4} fontSize="2xl" textAlign="center">
                    Sign Up
                </Heading>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Confirm Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </FormControl>

                        <Button
                            bg="var(--accent-color)"
                            type="submit"
                            width="full"
                            isLoading={loading}
                            loadingText="Creating Account"
                            _hover={{ bg: "yellow.300" }}
                        >
                            Sign Up
                        </Button>

                        <Text textAlign="center" mt={2}>
                            Already have an account?{" "}
                            <Button variant="link" colorScheme="teal">
                                <Link href="/auth/login">Login</Link>
                            </Button>
                        </Text>
                    </Stack>
                </form>
            </Box>
        </Box>
    );
}
