﻿// <auto-generated />
using System;
using DomainModelLayer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DomainModelLayer.Migrations
{
    [DbContext(typeof(ToDoListDbContext))]
    partial class ToDoListDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("DomainModelLayer.Models.UserDetail", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<string>("Password")
                        .HasMaxLength(10)
                        .IsUnicode(false)
                        .HasColumnType("varchar(10)");

                    b.Property<string>("UserName")
                        .HasMaxLength(30)
                        .IsUnicode(false)
                        .HasColumnType("varchar(30)");

                    b.HasKey("UserId")
                        .HasName("PK__UserDeta__1788CC4C14C97D7C");

                    b.HasIndex(new[] { "UserName" }, "UQ__UserDeta__C9F284560696E998")
                        .IsUnique()
                        .HasFilter("[UserName] IS NOT NULL");

                    b.ToTable("UserDetails");
                });

            modelBuilder.Entity("DomainModelLayer.Models.UserTask", b =>
                {
                    b.Property<int>("TaskId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TaskId"));

                    b.Property<bool?>("IsDone")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(false);

                    b.Property<DateTime?>("TaskDate")
                        .HasColumnType("datetime");

                    b.Property<string>("TaskDescription")
                        .HasMaxLength(300)
                        .IsUnicode(false)
                        .HasColumnType("varchar(300)");

                    b.Property<string>("TaskTitle")
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("TaskId")
                        .HasName("PK__UserTask__7C6949B1A735AA36");

                    b.HasIndex("UserId");

                    b.ToTable("UserTasks");
                });

            modelBuilder.Entity("DomainModelLayer.Models.UserTask", b =>
                {
                    b.HasOne("DomainModelLayer.Models.UserDetail", "User")
                        .WithMany("UserTasks")
                        .HasForeignKey("UserId")
                        .HasConstraintName("FK__UserTasks__UserI__4E88ABD4");

                    b.Navigation("User");
                });

            modelBuilder.Entity("DomainModelLayer.Models.UserDetail", b =>
                {
                    b.Navigation("UserTasks");
                });
#pragma warning restore 612, 618
        }
    }
}
