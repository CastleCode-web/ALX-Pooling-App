import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Vote, Users, BarChart3, Clock, ArrowRight, Star, CheckCircle, TrendingUp } from "lucide-react";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Vote className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                ALX Polly
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Create engaging polls, gather insights, and make data-driven
              decisions with our powerful polling platform.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/register">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6"
            >
              <Link href="/polls">Browse Polls</Link>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 pt-4">
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Free to use</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Unlimited polls</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose ALX Polly?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our platform offers everything you need to create, manage, and
            analyze polls effectively.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-2 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Vote className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>Easy Poll Creation</CardTitle>
              <CardDescription>
                Create professional polls in minutes with our intuitive
                interface and customizable options
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-green-200 dark:hover:border-green-800 transition-colors">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>Real-time Analytics</CardTitle>
              <CardDescription>
                Track votes and analyze results with detailed insights,
                charts, and exportable reports
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-purple-200 dark:hover:border-purple-800 transition-colors">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle>Community Driven</CardTitle>
              <CardDescription>
                Engage with a vibrant community and discover trending polls
                from users worldwide
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                  Powerful Features
                </Badge>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Everything you need to run successful polls
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  From simple yes/no questions to complex multi-option surveys,
                  ALX Polly has the tools to capture the insights you need.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Multiple Poll Types
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Single choice, multiple choice, and ranked voting options
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Advanced Analytics
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Detailed insights, demographic data, and trend analysis
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Privacy Controls
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Anonymous voting, private polls, and GDPR compliance
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    10K+
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">
                    Active Users
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    99.9%
                  </div>
                  <div className="text-sm text-purple-700 dark:text-purple-300">
                    Uptime
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    50K+
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-300">
                    Polls Created
                  </div>
                </div>
                <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    500K+
                  </div>
                  <div className="text-sm text-orange-700 dark:text-orange-300">
                    Votes Cast
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get started with ALX Polly in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Create Your Poll
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Use our intuitive form to create polls with multiple options,
              descriptions, and custom settings
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Share & Collect
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Share your poll link or embed it anywhere. Watch votes come in
              real-time as people participate
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Analyze Results
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get detailed analytics, export data, and make informed decisions
              based on your poll results
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <Card className="text-center p-8 bg-gradient-to-r from-blue-600 to-indigo-600 border-0">
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">
                Ready to Get Started?
              </h2>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                Join thousands of users who are already creating engaging polls
                and gathering valuable insights with ALX Polly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6"
              >
                <Link href="/register">
                  Create Free Account
                  <Star className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-blue-600"
              >
                <Link href="/login">Sign In</Link>
              </Button>
            </div>

            <p className="text-blue-200 text-sm">
              No credit card required • Free forever • Cancel anytime
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Vote className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  ALX Polly
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                The modern polling platform for gathering insights and making
                data-driven decisions.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Product
              </h3>
              <div className="space-y-2 text-sm">
                <Link href="/polls" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white block">
                  Browse Polls
                </Link>
                <Link href="/create-poll" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white block">
                  Create Poll
                </Link>
                <Link href="/analytics" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white block">
                  Analytics
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Company
              </h3>
              <div className="space-y-2 text-sm">
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white block">
                  About Us
                </Link>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white block">
                  Contact
                </Link>
                <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white block">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white block">
                  Terms of Service
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Support
              </h3>
              <div className="space-y-2 text-sm">
                <Link href="/help" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white block">
                  Help Center
                </Link>
                <Link href="/docs" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white block">
                  Documentation
                </Link>
                <Link href="/community" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white block">
                  Community
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 ALX Polly. Made with ❤️ for the community.
            </div>
            <div className="flex items-center gap-4">
              <Link href="/welcome" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">
                Marketing
              </Link>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <Link href="/polls" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">
                App
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
