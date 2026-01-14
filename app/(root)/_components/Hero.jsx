import Tools from './tools'

export default function Hero() {

    return (
        <section className="relative overflow-hidden py-12 sm:py-20 lg:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className="text-center"
                >

                    {/* Main Heading */}
                    <h1
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6"
                    >
                        Build Your Projects Faster with{' '}
                        <span className="bg-linear-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                            Next.js & Firebase
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p
                        className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-12"
                    >
                        The boilerplate with authentication, payments, and everything you need to launch faster. 
                        Start building in minutes, not days.
                    </p>

                    {/* Stack Section */}
                    <Tools />
                </div>
            </div>
        </section>
    )
}