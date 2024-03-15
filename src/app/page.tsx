import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="container box-border ">
        <section className="banner-wrapper w-100">
          <div className="baner w-100  rounded-3xl h-96 bg-brownHero box-border p-20 ">
            <div className="banner-content-wrapper">
              <div className="banner-title font-bold text-4xl text text-white leading-relaxed mb-12">
                <h1>Here Skills</h1>
                <h1>Meet Oppprtunity</h1>
              </div>
              <div className="banner-btn-wrapper flex w-fit gap-10">
                <Button className="text-lg h-12 bg-white text-secondary-foreground hover:text-primary-foreground">Be A Freelancer</Button>
                <Button className="text-lg h-12 hover:bg-white hover:text-secondary-foreground hover:bg-secondary" >Hire A Freelancer <span></span></Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
