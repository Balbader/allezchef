'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	ChefHat,
	Sparkles,
	Clock,
	UtensilsCrossed,
	ShoppingCart,
	Brain,
	ArrowRight,
	CheckCircle2,
} from 'lucide-react';

export default function Home() {
	const heroRef = useRef<HTMLDivElement>(null);
	const featuresRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const ctaRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Hero animations
			const tl = gsap.timeline();

			tl.from(titleRef.current, {
				y: 50,
				opacity: 0,
				duration: 1,
				ease: 'power3.out',
			})
				.from(
					subtitleRef.current,
					{
						y: 30,
						opacity: 0,
						duration: 0.8,
						ease: 'power3.out',
					},
					'-=0.5',
				)
				.from(
					ctaRef.current,
					{
						y: 20,
						opacity: 0,
						duration: 0.6,
						ease: 'power3.out',
					},
					'-=0.4',
				);

			// Floating animation for icon
			gsap.to('.floating-icon', {
				y: -20,
				duration: 2,
				ease: 'power1.inOut',
				repeat: -1,
				yoyo: true,
			});

			// Features scroll animation using Intersection Observer
			// Use setTimeout to ensure DOM is fully rendered
			setTimeout(() => {
				const featureCards = document.querySelectorAll('.feature-card');
				const statItems = document.querySelectorAll('.stat-item');

				const observerOptions = {
					threshold: 0.2,
					rootMargin: '0px 0px -100px 0px',
				};

				const observer = new IntersectionObserver((entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							gsap.to(entry.target, {
								y: 0,
								opacity: 1,
								duration: 0.8,
								ease: 'power3.out',
							});
							observer.unobserve(entry.target);
						}
					});
				}, observerOptions);

				featureCards.forEach((card) => {
					gsap.set(card, { y: 60, opacity: 0 });
					observer.observe(card);
				});

				// Stats animation
				const statsObserver = new IntersectionObserver((entries) => {
					entries.forEach((entry, index) => {
						if (entry.isIntersecting) {
							gsap.to(entry.target, {
								scale: 1,
								opacity: 1,
								duration: 0.6,
								delay: index * 0.1,
								ease: 'back.out(1.7)',
							});
							statsObserver.unobserve(entry.target);
						}
					});
				}, observerOptions);

				statItems.forEach((item) => {
					gsap.set(item, { scale: 0.8, opacity: 0 });
					statsObserver.observe(item);
				});
			}, 100);
		});

		return () => ctx.revert();
	}, []);

	const features = [
		{
			icon: Brain,
			title: 'AI-Powered Recipes',
			description:
				'Get personalized recipe suggestions based on your preferences, dietary restrictions, and available ingredients.',
		},
		{
			icon: Clock,
			title: 'Time-Saving Tips',
			description:
				'Learn efficient cooking techniques and time-saving hacks to make meal prep faster and easier.',
		},
		{
			icon: ShoppingCart,
			title: 'Smart Shopping Lists',
			description:
				'Automatically generate organized shopping lists based on your meal plans and pantry inventory.',
		},
		{
			icon: UtensilsCrossed,
			title: 'Step-by-Step Guidance',
			description:
				'Follow detailed, easy-to-understand instructions with real-time assistance as you cook.',
		},
		{
			icon: Sparkles,
			title: 'Recipe Adaptation',
			description:
				'Modify recipes on the fly - substitute ingredients, adjust portions, or convert measurements instantly.',
		},
		{
			icon: ChefHat,
			title: 'Culinary Education',
			description:
				'Learn cooking fundamentals, techniques, and tips from a virtual sous chef that adapts to your skill level.',
		},
	];

	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section
				ref={heroRef}
				className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20"
			>
				{/* Background gradient */}
				<div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

				{/* Animated background elements */}
				<div className="absolute inset-0 overflow-hidden">
					<div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
					<div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
				</div>

				<div className="relative z-10 mx-auto max-w-4xl text-center">
					<div className="mb-8 flex justify-center">
						<div className="floating-icon rounded-full bg-primary/10 p-4">
							<ChefHat className="h-12 w-12 text-primary" />
						</div>
					</div>

					<h1
						ref={titleRef}
						className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
					>
						<span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
							AllezChef
						</span>
						<br />
						<span className="text-foreground">
							Your AI Sous Chef
						</span>
					</h1>

					<p
						ref={subtitleRef}
						className="mb-10 text-lg text-muted-foreground sm:text-xl md:text-2xl"
					>
						Transform your cooking experience with intelligent
						recipe suggestions,
						<br className="hidden sm:block" />
						personalized meal planning, and expert culinary
						guidance.
					</p>

					<div
						ref={ctaRef}
						className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
					>
						<Button size="lg" className="group text-lg">
							Get Started
							<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
						</Button>
						<Button size="lg" variant="outline" className="text-lg">
							Watch Demo
						</Button>
					</div>

					{/* Trust indicators */}
					<div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
						<div className="flex items-center gap-2">
							<CheckCircle2 className="h-5 w-5 text-primary" />
							<span>Free to start</span>
						</div>
						<div className="flex items-center gap-2">
							<CheckCircle2 className="h-5 w-5 text-primary" />
							<span>No credit card required</span>
						</div>
						<div className="flex items-center gap-2">
							<CheckCircle2 className="h-5 w-5 text-primary" />
							<span>AI-powered assistance</span>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section
				ref={featuresRef}
				className="relative px-4 py-24 sm:px-6 lg:px-8"
			>
				<div className="mx-auto max-w-7xl">
					<div className="mb-16 text-center">
						<h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
							Everything You Need to Cook Like a Pro
						</h2>
						<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
							AllezChef combines the power of AI with culinary
							expertise to help you create amazing meals every
							time.
						</p>
					</div>

					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{features.map((feature, index) => {
							const Icon = feature.icon;
							return (
								<Card
									key={index}
									className="feature-card group border-2 transition-all hover:border-primary/50 hover:shadow-lg"
								>
									<CardHeader>
										<div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
											<Icon className="h-6 w-6 text-primary" />
										</div>
										<CardTitle className="text-xl">
											{feature.title}
										</CardTitle>
									</CardHeader>
									<CardContent>
										<CardDescription className="text-base">
											{feature.description}
										</CardDescription>
									</CardContent>
								</Card>
							);
						})}
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<section className="relative bg-muted/30 px-4 py-24 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-7xl">
					<div className="mb-16 text-center">
						<h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
							How It Works
						</h2>
						<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
							Getting started with AllezChef is simple and
							intuitive.
						</p>
					</div>

					<div className="grid gap-8 md:grid-cols-3">
						{[
							{
								step: '01',
								title: 'Tell Us What You Have',
								description:
									'Share your available ingredients, dietary preferences, and cooking skill level.',
							},
							{
								step: '02',
								title: 'Get Personalized Recipes',
								description:
									'Receive AI-curated recipe suggestions tailored to your needs and preferences.',
							},
							{
								step: '03',
								title: 'Cook with Confidence',
								description:
									'Follow step-by-step guidance with real-time tips and adjustments as you cook.',
							},
						].map((item, index) => (
							<div
								key={index}
								className="group relative rounded-xl border bg-card p-8 transition-all hover:shadow-lg"
							>
								<div className="mb-4 text-5xl font-bold text-primary/20">
									{item.step}
								</div>
								<h3 className="mb-3 text-xl font-semibold">
									{item.title}
								</h3>
								<p className="text-muted-foreground">
									{item.description}
								</p>
								<div className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100">
									<ArrowRight className="h-6 w-6 text-primary" />
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="stats-section relative px-4 py-24 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-7xl">
					<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
						{[
							{ value: '10K+', label: 'Recipes Available' },
							{ value: '50K+', label: 'Happy Cooks' },
							{ value: '4.9★', label: 'Average Rating' },
							{ value: '24/7', label: 'AI Assistance' },
						].map((stat, index) => (
							<div key={index} className="stat-item text-center">
								<div className="mb-2 text-4xl font-bold text-primary sm:text-5xl">
									{stat.value}
								</div>
								<div className="text-muted-foreground">
									{stat.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="relative px-4 py-24 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-4xl">
					<Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
						<CardHeader className="text-center">
							<CardTitle className="mb-4 text-3xl sm:text-4xl">
								Ready to Transform Your Cooking?
							</CardTitle>
							<CardDescription className="text-lg">
								Join thousands of home cooks who are already
								creating amazing meals with AllezChef.
							</CardDescription>
						</CardHeader>
						<CardContent className="flex justify-center">
							<Button size="lg" className="text-lg">
								Start Cooking Now
								<ArrowRight className="ml-2 h-5 w-5" />
							</Button>
						</CardContent>
					</Card>
				</div>
			</section>
		</div>
	);
}
