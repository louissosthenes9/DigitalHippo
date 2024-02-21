export const  PRODUCT_CATEGORIES = [
    {
        label:"UI kits",
        value:"ui_kits" as const,
        featured: [
            {
                name:"Editor's pick",
                href:"#",
                imageSrc:"/nav/ui-kits/mix.jpg"
            },
            {
                name:"New Arrivals",
                href:"#",
                imageSrc:"/nav/ui-kits/blue.jpg"
            },
            {
                name:"Best seller",
                href:"#",
                imageSrc:"/nav/ui-kits/purple.jpg"
            },
        ]

    },
    {
        label:"Icons",
        value:"icons" as const,
        featured: [
            {
                name:"Editor's pick",
                href:"#",
                imageSrc:"/nav/icons/picks.jpg"
            },
            {
                name:"New Arrivals",
                href:"#",
                imageSrc:"/nav/icons/new.jpg"
            },
            {
                name:"Best selling icons",
                href:"#",
                imageSrc:"/nav/icons/bestseller.jpg"
            },
        ]

    },
]