function PageHeader({ label, title, description, children }) {
    return (
        <div className='flex flex-col items-center gap-4 bg-white px-4 py-6 sm:px-6 sm:py-10 lg:px-10 lg:py-16 w-full'>
            <p className="text-center text-black text-sm sm:text-base lg:text-lg">{label}</p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl text-slate-900 italic font-extrabold">{title}</h1>
            {description && <p className="text-center text-black">{description}</p>}
            {children}
        </div>
    );
};

export default PageHeader;