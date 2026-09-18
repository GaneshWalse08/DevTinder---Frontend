const UserCard = (props) => {
  const { user } = props;

  return (
    <div className="w-96 overflow-hidden rounded-3xl border border-emerald-500/20 bg-[#080A0A] shadow-2xl shadow-emerald-950/30">
      {/* Profile Image */}
      <div className="relative flex justify-center pt-6">
        <div className="h-44 w-44 overflow-hidden rounded-full border-2 border-emerald-400/50 shadow-lg shadow-emerald-500/20">
          <img
            src={
              user.photoUrl ||
              "https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?w=600&auto=format&fit=crop&q=60"
            }
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Developer Badge */}
        <div className="absolute right-5 top-6 rounded-full border border-emerald-500/30 bg-[#101715] px-3 py-1.5 text-xs text-emerald-300">
          ● Developer
        </div>
      </div>

      {/* Card Body */}
      <div className="px-6 pb-6 pt-5">
        {/* Name + Age */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">
            {user.firstName} {user.lastName}
          </h2>

          <div className="flex justify-evenly">
            {user.age && (
              <p className="mt-1 text-gray-400 pr-3">{user.age} years</p>
            )}

            {user.gender && (
              <p className="mt-1 text-gray-400 pr-3">
                {user.gender} {user.gender === "male" ? "♂" : "♀"}{" "}
              </p>
            )}
          </div>
        </div>

        {/* GitHub + LinkedIn */}
        <div className="mt-5 flex gap-3">
          {user.githubUrl && (
            <a
              href={user.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gray-600 px-4 py-3 text-sm font-medium text-white transition hover:border-emerald-400 hover:bg-emerald-500/10"
            >
              <span className="text-lg">◉</span>
              GitHub ↗
            </a>
          )}

          {user.linkedinUrl && (
            <a
              href={user.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-blue-500/40 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-500/10"
            >
              <span className="font-bold">in</span>
              LinkedIn ↗
            </a>
          )}
        </div>

        {/* About */}
        <div className="mt-6">
          <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-300">
            <span className="text-emerald-400">♙</span>
            About
          </h3>

          <p className="text-sm leading-6 text-gray-400">
            {user.about || "This is default about the user..."}
          </p>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-300">
            <span className="text-emerald-400">&lt;/&gt;</span>
            Skills
          </h3>

          <div className="flex flex-wrap gap-2">
            {user.skills?.map((skill, index) => (
              <span
                key={index}
                className="rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-sm text-emerald-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-between gap-10 border-t border-white/10 pt-5">
          {/* Ignore Button */}
          <button
            className="cursor-pointer flex h-13 w-13 items-center justify-center rounded-full bg-[#1b1d20] text-white shadow-lg transition-all duration-200 hover:scale-110 hover:bg-[#25272b] hover:text-red-500"
            title="Ignore"
          >
            <span className="text-4xl font-light leading-none">×</span>
          </button>

          {/* Interested Button */}
          <button
            className="cursor-pointer flex h-13 w-13 items-center justify-center rounded-full bg-[#1b1d20] text-red-500 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-[#25272b] hover:text-red-400"
            title="Interested"
          >
            <span className="text-4xl leading-none">♡</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
