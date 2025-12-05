using Application.Services;
using Domain.Entities;
using Domain.Interface;
using Infrastructure.Data;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddIdentity<User, Role>(options =>
{
    options.User.RequireUniqueEmail = true;
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 6;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.SignIn.RequireConfirmedPhoneNumber = false;
    options.SignIn.RequireConfirmedEmail = false;
    options.SignIn.RequireConfirmedAccount = false;
})
.AddEntityFrameworkStores<AppDbContext>()
.AddDefaultTokenProviders();

var jwtSettings = builder.Configuration.GetSection("JWTSettings");
var secretKey = jwtSettings["TokenKey"];

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = "Bearer";
    options.DefaultChallengeScheme = "Bearer";
})
.AddJwtBearer("Bearer", options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false, 
        ValidateAudience = false, 
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey!))
    };
});
builder.Services.AddAuthorization();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Please enter a valid token",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header,
            },
            new List<string>()
        }
    });
});

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});

builder.Services.AddDbContext<AppDbContext>(x =>
    x.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddHttpContextAccessor();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Register your services
builder.Services.AddScoped<IApplicationService, ApplicationService>();
builder.Services.AddScoped<DbInitialization>();
builder.Services.AddScoped<IJobService, JobService>();
builder.Services.AddScoped<IJobTypeService, JobTypeService>();
builder.Services.AddScoped<ILocationService, LocationService>();
builder.Services.AddScoped<IStudyFieldService, StudyFieldService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IEmployerIndustryService, EmployerIndustryService>();
builder.Services.AddScoped<IIndustryService, IndustryService>();
builder.Services.AddScoped<IInterestsService, InterestsService>();
builder.Services.AddScoped<IStudentStudentSkillsService, StudentStudentSkillsService>();
builder.Services.AddScoped<IStudentSkillsService, StudentSkillsService>();
builder.Services.AddScoped<IStudentInterestsService, StudentInterestsService>();
builder.Services.AddScoped<IAuthorizationManager, AuthorizationManager>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var cvPath = Path.Combine("C:\\LITA_Uploads", "cv");
Directory.CreateDirectory(cvPath);

var profilePath = Path.Combine(builder.Environment.WebRootPath, "uploads", "profiles");
Directory.CreateDirectory(profilePath);


app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(cvPath),
    RequestPath = "/uploads/cv"
});

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(profilePath),
    RequestPath = "/uploads/profiles"
});

app.UseStaticFiles();

app.UseCors(MyAllowSpecificOrigins);


app.UseAuthentication(); 
app.UseAuthorization();


using (var scope = app.Services.CreateAsyncScope())
{
    var dbInitialization = scope.ServiceProvider.GetRequiredService<DbInitialization>();
    await dbInitialization.Init(CancellationToken.None);
}

app.MapControllers();

app.Run();