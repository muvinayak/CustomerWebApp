using CustomerInfo.Models;
using Microsoft.EntityFrameworkCore;

var AllowedOrigins = "_allowedOrigins";
var builder = WebApplication.CreateBuilder(args);

//logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy(AllowedOrigins,
                        policy =>
                        {
                            policy.WithOrigins("http://localhost:4200")
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                        });
});

builder.Services.AddControllers();
builder.Services.AddDbContext<CustomerContext>(opt => opt.UseInMemoryDatabase("Customer"));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(AllowedOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
