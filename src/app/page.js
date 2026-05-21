import Hero from "@/components/landing/Hero";
import WhyUs from "@/components/landing/WhyUs";
import HowItWorks from "@/components/landing/HowItWorks";
import CTA from "@/components/landing/CTA";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";

const HomePage = () => {
	return (
		<main>
		  	<NavBar />
      			<Hero />
 	     		<WhyUs />
      			<HowItWorks />
	      		<CTA />
      			<Footer />
    		</main>
	);
};

export default HomePage;
