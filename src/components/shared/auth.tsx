import React, { memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const AuthContainer: React.FC = () => {
  
  // 1. Google OAuth Stream Handler Trigger
  const handleGoogleOAuth = () => {
    console.log("Redirecting system history contexts to Google Identity endpoint window standard client ID...");
    // window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?...";
  };

  // 2. Email Login Submission Handler
  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log("Login credentials packet compiled:", { email: data.email });
  };

  // 3. Email Signup Submission Handler
  const handleSignupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log("Signup creation request packet compiled:", { name: data.name, email: data.email });
  };

  return (
    <div className="w-full min-h-[80vh] bg-background text-foreground flex items-center justify-center">
        <Tabs defaultValue="login" className="w-full space-y-6 max-w-xl">
          
          {/* Centered Segment Control Selection bar */}
          <TabsList className="grid w-full grid-cols-2 bg-secondary p-1 rounded-xl">
            <TabsTrigger value="login" className="rounded-lg data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Sign In</TabsTrigger>
            <TabsTrigger value="signup" className="rounded-lg data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Register</TabsTrigger>
          </TabsList>

          {/* --- SIGN IN SEGMENT --- */}
          <TabsContent value="login">
            <Card className="border border-border bg-card shadow-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                <CardDescription>
                  Enter credentials to re-initialize your operational user context token.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {/* Unified Native Google Sign-In Block */}
                <Button variant="outline" type="button" onClick={handleGoogleOAuth} className="w-full flex items-center justify-center space-x-2 border-border bg-background hover:bg-muted text-foreground font-semibold">
                  {/* Google SVG Icon Asset */}
                  <svg className="h-5 w-5 mr-1" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <g transform="matrix(1, 0, 0, 1, 0, 0)">
                      <path d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.6h3.29c1.92,-1.78 3.02,-4.4 3.02,-7.4C21.65,11.9 21.54,11.5 21.35,11.1z" fill="#4285F4" />
                      <path d="M12,20.5c2.43,0 4.47,-0.8 5.96,-2.2l-3.29,-2.6c-0.9,0.6 -2.07,0.98 -3.52,0.98 -2.71,0 -5.01,-1.83 -5.83,-4.3H2.03v2.7C3.51,17.7 7.47,20.5 12,20.5z" fill="#34A853" />
                      <path d="M6.17,12.38c-0.2,-0.6 -0.32,-1.25 -0.32,-1.92s0.12,-1.32 0.32,-1.92V5.84H2.03C1.35,7.2 0.96,8.74 0.96,10.46c0,1.72 0.39,3.26 1.07,4.62l3.29,-2.7H6.17z" fill="#FBBC05" />
                      <path d="M12,4.12c1.32,0 2.51,0.45 3.45,1.35l2.58,-2.6C16.46,1.4 14.42,0.5 12,0.5 7.47,0.5 3.51,3.3 2.03,6.02l3.29,2.6C6.14,6 8.44,4.12 12,4.12z" fill="#EA4335" />
                    </g>
                  </svg>
                  <span>Continue with Google</span>
                </Button>

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-border"></div>
                  <span className="flex-shrink mx-4 text-xs max-w-fit text-muted-foreground uppercase tracking-widest">Or login with email</span>
                  <div className="flex-grow border-t border-border"></div>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email Address</Label>
                    <Input id="login-email" name="email" type="email" placeholder="name@domain.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input id="login-password" name="password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full font-semibold">Log In</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- SIGN UP SEGMENT --- */}
          <TabsContent value="signup">
            <Card className="border border-border bg-card shadow-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight">Create Account</CardTitle>
                <CardDescription>Deploy an isolated system profile matching credential rules.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {/* OAuth Registration Pipeline Link */}
                <Button variant="outline" type="button" onClick={handleGoogleOAuth} className="w-full flex items-center justify-center space-x-2 border-border bg-background hover:bg-muted text-foreground font-semibold">
                  {/* Google SVG */}
                  <svg className="h-5 w-5 mr-1" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <g transform="matrix(1, 0, 0, 1, 0, 0)">
                      <path d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.6h3.29c1.92,-1.78 3.02,-4.4 3.02,-7.4C21.65,11.9 21.54,11.5 21.35,11.1z" fill="#4285F4" />
                      <path d="M12,20.5c2.43,0 4.47,-0.8 5.96,-2.2l-3.29,-2.6c-0.9,0.6 -2.07,0.98 -3.52,0.98 -2.71,0 -5.01,-1.83 -5.83,-4.3H2.03v2.7C3.51,17.7 7.47,20.5 12,20.5z" fill="#34A853" />
                      <path d="M6.17,12.38c-0.2,-0.6 -0.32,-1.25 -0.32,-1.92s0.12,-1.32 0.32,-1.92V5.84H2.03C1.35,7.2 0.96,8.74 0.96,10.46c0,1.72 0.39,3.26 1.07,4.62l3.29,-2.7H6.17z" fill="#FBBC05" />
                      <path d="M12,4.12c1.32,0 2.51,0.45 3.45,1.35l2.58,-2.6C16.46,1.4 14.42,0.5 12,0.5 7.47,0.5 3.51,3.3 2.03,6.02l3.29,2.6C6.14,6 8.44,4.12 12,4.12z" fill="#EA4335" />
                    </g>
                  </svg>
                  <span>Sign up with Google</span>
                </Button>

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-border"></div>
                  <span className="flex-shrink mx-4 text-xs max-w-fit text-muted-foreground uppercase tracking-widest">Or create profile</span>
                  <div className="flex-grow border-t border-border"></div>
                </div>

                <form onSubmit={handleSignupSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input id="signup-name" name="name" type="text" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email Address</Label>
                    <Input id="signup-email" name="email" type="email" placeholder="name@domain.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Secure Password</Label>
                    <Input id="signup-password" name="password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full font-semibold">Create Account</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>

    </div>
  );
};

export default memo(AuthContainer);